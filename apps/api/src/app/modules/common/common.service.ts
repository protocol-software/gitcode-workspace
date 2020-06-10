import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOtp } from './interfaces/otp-document.interface';

import * as AWS from 'aws-sdk';
import {EmailDto, OtpDto} from "@protocol/data";

@Injectable()
export class CommonService {
  constructor(
    @InjectModel('Otp') private readonly otpModel: Model<IOtp>,
  ) {

  }

  private async createOtp(): Promise<string> {
    let otpData = null;

    while(!otpData) {
      const code = Math.floor((Math.random() * (999999 - 100000)) + 100000).toString();
      const result = await this.otpModel.findOne({ code }).exec();

      if(result === null) {
        otpData = { code };
      }
    }

    return otpData.code;
  }
  private async saveOtp(identity: string, otp: string): Promise<void> {
    await this.otpModel.findOneAndUpdate(
      { identity: identity },
      { code: otp },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).exec();
  }

  public async sendEmail(emailDto: EmailDto): Promise<any> {
    if(!['no-reply@protocol.network'].includes(emailDto.from)) {
      throw new Error(`${emailDto.from} is not valid email.`);
    }
    
    const region = 'ap-south-1';
    const accessKeyId = 'AKIA5W7LYT7EMNEM4CUB';
    const secretAccessKey = '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';

    AWS.config.update({
      accessKeyId,
      secretAccessKey,
      region
    });

    const sesParams = {
      Destination: {
        CcAddresses: emailDto.ccs,
        ToAddresses: emailDto.tos
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: emailDto.bodyHtml
          },
          // Text: {
          //   Charset: "UTF-8",
          //   Data: null
          // }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: emailDto.subject
        }
        },
      Source: emailDto.from,
      ReplyToAddresses: null,
    };

    return await new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(sesParams).promise();
  }

  public async sendOtpEmail(otpDto: OtpDto): Promise<any> {
    const otpCode = await this.createOtp();
    await this.saveOtp(otpDto.identity, otpCode);

    const params: EmailDto = {
      from: 'no-reply@protocol.network',
      tos: [otpDto.identity],
      ccs: [],
      subject: otpDto.subject,
      bodyHtml: otpDto.bodyHtml.replace('OTPCODE', otpCode),
    };

    await this.sendEmail(params);

    return true;
  }

  public async verifyOtp(otpDto: OtpDto): Promise<any> {
    const result = await this.otpModel.findOne({
      identity: otpDto.identity,
      code: otpDto.code,
    }).exec();

    return result !== null;
  }

}

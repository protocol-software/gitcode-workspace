import { Body, Controller, Get, Post } from '@nestjs/common';

import { CommonService } from './common.service';
import {EmailDto, OtpDto} from "@gitcode/data";

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('send-email')
  public async sendEmail(@Body() emailDto: EmailDto): Promise<any> {
    return await this.commonService.sendEmail(emailDto);
  }

  @Post('send-otp-via-email')
  public async sendOtpEmail(@Body() otpDto: OtpDto): Promise<any> {
    return await this.commonService.sendOtpEmail(otpDto);
  }

  @Post('verify-otp')
  public async verifyOtp(@Body() otpDto: OtpDto): Promise<any> {
    return await this.commonService.verifyOtp(otpDto);
  }
}

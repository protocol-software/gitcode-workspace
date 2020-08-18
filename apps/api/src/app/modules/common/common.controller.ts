import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

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

  @Get('currency/:from/:to/:amount')
  public convertCurrency(@Param() params): Observable<number> {
    return this.commonService.convertCurrency(params.from, params.to, params.amount);
  }
}

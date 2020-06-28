import { Body, Controller, Get, Post } from '@nestjs/common';

import { SnackCodeService } from './snack-code.service';
import {CodeTagDto} from "@gitcode/data";

@Controller('snack-code')
export class SnackCodeController {
  constructor(private readonly snackCodeService: SnackCodeService) {}

  @Get('tags')
  public async getTags(): Promise<any> {
    return await this.snackCodeService.getTags();
  }

  @Post('contents')
  public async getContents(@Body() codeTag: [CodeTagDto]): Promise<any> {
    return await this.snackCodeService.getContents(codeTag);
  }
}

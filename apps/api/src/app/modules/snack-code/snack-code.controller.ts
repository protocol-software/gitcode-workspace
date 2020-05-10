import { Body, Controller, Get, Post } from '@nestjs/common';

import { SnackCodeService } from './snack-code.service';
import {CodeTagDto} from "@re-code-io/data";

@Controller('snack-code')
export class SnackCodeController {
  constructor(private readonly snackCodeService: SnackCodeService) {}

  @Get('tags')
  public async getTags(): Promise<any> {
    return await this.snackCodeService.getTags();
  }

  @Post('contents')
  public async getContents(@Body() codeTag: []): Promise<any> {
    return await this.snackCodeService.getContents(codeTag);
  }
}

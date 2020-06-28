import { Body, Controller, Get, Post } from '@nestjs/common';

import { SearchCodeService } from './search-code.service';
import {CodeQueryDto} from "@gitcode/data";

@Controller('search-code')
export class SearchCodeController {
  constructor(private readonly searchCodeService: SearchCodeService) {}

  @Get('suggest-query')
  public async getSuggestQuery(@Body() codeQuery: CodeQueryDto): Promise<any> {
    return await this.searchCodeService.getSuggestQuery(codeQuery);
  }

  @Get('query')
  public async query(@Body() codeQuery: CodeQueryDto): Promise<any> {
    return await this.searchCodeService.query(codeQuery);
  }
}

import { Body, Controller, Get, Post, Headers } from '@nestjs/common';

import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post('webhook/pr')
  public async receiveWebhook(@Headers('x-github-event') xGithubEvent: string, @Body() body: any): Promise<any> {
    return await this.githubService.receiveWebhook(xGithubEvent, body);
  }
}

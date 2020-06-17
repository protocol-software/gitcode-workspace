import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {
  constructor(
  ) {

  }

  public async receiveWebhook(xGithubEvent: string, body: any): Promise<any> {
    const action = body.action;
    const prState = body.pull_request.state;

    // X-GitHub-Event: pull_request, "action": "opened",
    // X-GitHub-Event: pull_request_review, "action": "edited",
    // X-GitHub-Event: pull_request_review, "action": "submitted",
    // X-GitHub-Event: pull_request_review_comment, "action": "created",

    return null;
  }

}

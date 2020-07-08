import { ICodeReviewAuthor } from './code-review-author.interface';
import { ICodeReviewReviewer } from './code-review-reviewer.interface';
import { IGithubPullRequest } from './github-pull-request.interface';

export interface ICodeReviewItem {
  author: ICodeReviewAuthor;
  createdAt: string;
  description: string;
  githubPR: IGithubPullRequest;
  proficiency: string;
  purpose: string;
  reviewers: ICodeReviewReviewer[];
  state: string;
  title: string;
  topics: any[];
  updatedAt?: string;
}

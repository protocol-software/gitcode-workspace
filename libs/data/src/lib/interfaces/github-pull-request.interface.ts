import { IGitHubRepo } from './github-repo.interface';
import { IGitHubUser } from './github-user.interface';

export interface IGithubPullRequest {
  draft: boolean;
  merged: boolean;
  user: IGitHubUser;
  diff_url: string;
  deletions: number;
  changed_files: number;
  state: string;
  additions: number;
  title: string;
  assignee: any;
  milestone: any;
  merge_commit_sha: any;
  mergeable: any;
  requested_reviewers: any[];
  review_comments: number;
  merged_at: any;
  comments: number;
  number: number;
  issue_url: string;
  review_comment_url: string;
  active_lock_reason: any;
  locked: boolean;
  assignees: any[];
  _links: IGithubLinks;
  patch_url: string;
  rebaseable: any;
  statuses_url: string;
  review_comments_url: string;
  html_url: string;
  comments_url: string;
  commits: number;
  labels: any[];
  base: IGithubCommitRef;
  requested_teams: any[];
  created_at: string;
  author_association: string;
  url: string;
  id: number;
  updated_at: string;
  merged_by: any;
  node_id: string;
  maintainer_can_modify: boolean;
  closed_at: any;
  mergeable_state: string;
  commits_url: string;
  body: string;
  head: IGithubCommitRef;
  languages: string[];
}

interface IGithubCommitRef {
  label: string;
  ref: string;
  user: IGitHubUser;
  sha: string;
  repo: IGitHubRepo;
}

interface IGithubLinks {
  html: IGithubLink;
  issue: IGithubLink;
  self: IGithubLink;
  commits: IGithubLink;
  review_comment: IGithubLink;
  review_comments: IGithubLink;
  statuses: IGithubLink;
  comments: IGithubLink;
}

interface IGithubLink {
  href: string;
}

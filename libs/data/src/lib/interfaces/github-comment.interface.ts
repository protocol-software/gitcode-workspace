import { IGitHubUser } from './github-user.interface';

export interface IGithubComment {
  html_url: string;
  url: string;
  id: number;
  node_id: string;
  body: string;
  path: string;
  position: number;
  line: number;
  commit_id: string;
  user: IGitHubUser;
  created_at: string;
  updated_at: string;
}

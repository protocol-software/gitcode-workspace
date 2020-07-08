export interface ICodeReviewAuthor {
  displayName: string;
  providerUserData: IProviderUserData;
  photoURL: string;
  uid: string;
  email: string;
  lastLogin: string;
  accessToken: string;
}

interface IProviderUserData {
  github: IGithub;
}

interface IGithub {
  subscriptions_url: string;
  collaborators: number;
  received_events_url: string;
  blog: string;
  bio?: string;
  public_repos: number;
  following: number;
  site_admin: boolean;
  gists_url: string;
  company: any;
  followers: number;
  url: string;
  hireable?: boolean;
  two_factor_authentication: boolean;
  repos_url: string;
  followers_url: string;
  events_url: string;
  name: string;
  twitter_username: any;
  public_gists: number;
  total_private_repos: number;
  gravatar_id: string;
  starred_url: string;
  private_gists: number;
  login: string;
  organizations_url: string;
  disk_usage: number;
  html_url: string;
  id: number;
  email: any;
  created_at: string;
  owned_private_repos: number;
  following_url: string;
  plan: IGithubPlan;
  updated_at: string;
  node_id: string;
  avatar_url: string;
  location: any;
  type: string;
}

interface IGithubPlan {
  space: number;
  collaborators: number;
  name: string;
  private_repos: number;
}

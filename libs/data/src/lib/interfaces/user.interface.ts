import { ILicense } from './license.interface';

export interface IUser {
  uid?: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  lastLogin?: string;
  accessToken?: string;
  providerUserData?: { github?: GitHub };
  license?: ILicense;
}

interface GitHub {
  owned_private_repos?: number;
  node_id?: string;
  email?: any;
  private_gists?: number;
  subscriptions_url?: string;
  bio?: any;
  location?: string;
  repos_url?: string;
  url?: string;
  received_events_url?: string;
  events_url?: string;
  followers_url?: string;
  public_gists?: number;
  twitter_username?: any;
  public_repos?: number;
  plan?: Plan;
  following_url?: string;
  blog?: string;
  collaborators?: number;
  login?: string;
  type?: string;
  disk_usage?: number;
  company?: any;
  created_at?: string;
  starred_url?: string;
  html_url?: string;
  site_admin?: boolean;
  following?: number;
  two_factor_authentication?: boolean;
  total_private_repos?: number;
  updated_at?: string;
  followers?: number;
  name?: string;
  id?: number;
  organizations_url?: string;
  gists_url?: string;
  gravatar_id?: string;
  avatar_url?: string;
  hireable?: any;
}

interface Plan {
  collaborators?: number;
  space?: number;
  private_repos?: number;
  name?: string;
}

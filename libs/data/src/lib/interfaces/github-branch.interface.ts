export interface IGitHubBranch {
  name: string;
  commit: any;  // TODO
  protected: boolean;
  protection: any;  // TODO
  protection_url: string;
}

// https://developer.github.com/v3/repos/branches/#list-branches
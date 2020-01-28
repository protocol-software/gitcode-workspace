import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGitHubRepo, IGitHubUser } from '@re-code-io/data';
import { Observable } from 'rxjs';
import * as UrlAssembler from 'url-assembler';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private baseApiUrl = `https://api.github.com`;
  private accessToken: string;
  private requestHeaders;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('githubAccessToken')) {
      this.AccessToken = localStorage.getItem('githubAccessToken');
    }
  }

  public get AccessToken() {
    return this.accessToken;
  }

  public set AccessToken(token: string) {
    this.accessToken = token;

    this.requestHeaders = { 'Authorization': `token ${this.accessToken}` };
  }

  public getUser(): Observable<IGitHubUser> {
    const endpoint = UrlAssembler(this.baseApiUrl)
      .template(`/user`)
      .toString();

    return this.http.get<IGitHubUser>(endpoint, { headers: this.requestHeaders });
  }

  public getRepositories(userName: string): Observable<IGitHubRepo[]> {
    const endpoint = UrlAssembler(this.baseApiUrl)
      .template(`/users/${userName}/repos`)
      .toString();

    return this.http.get<IGitHubRepo[]>(endpoint, { headers: this.requestHeaders });
  }
}

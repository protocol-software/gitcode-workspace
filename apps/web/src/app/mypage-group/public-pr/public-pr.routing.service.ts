import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IPullRequest, IQueryParams } from '@re-code-io/data';
import { FirebaseHelperService } from '@re-code-io/ui';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PublicPrService {
  private prCollection: AngularFirestoreCollection<IPullRequest>;
  private collectionName = 'public-pr';

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private firebaseHelperService: FirebaseHelperService,
  ) {
    this.prCollection = this.firestore.collection<IPullRequest>(this.collectionName);
  }

  public getPullRequests(params?: IQueryParams): Observable<IPullRequest[]> {
    // const endpoint = SafeUrlAssembler(this.moduleConfig.environment.baseUrl.api)
    //   .template(ApiEndpoint.pullRequest.getAll)
    //   .toString();
    //
    // return this.http.get<IPullRequest[]>(endpoint);

    return this.firebaseHelperService.getCollection<IPullRequest>(this.collectionName, params);
  }

  public getPullRequestsValueChanges(): Observable<IPullRequest[]> {
    return this.firebaseHelperService.getCollectionValueChanges<IPullRequest>(this.collectionName);
  }

  public getPullRequest(id: string): Observable<IPullRequest> {
    // const endpoint = SafeUrlAssembler(this.moduleConfig.environment.baseUrl.api)
    //   .template(ApiEndpoint.pullRequest.getOne)
    //   .param({ id })
    //   .toString();
    //
    // return this.http.get<IPullRequest>(endpoint);

    return of(null);
  }

  public savePullRequest(data: IPullRequest): Promise<any> {
    if (!data.id) {
      throwError('Pull request ID is missing.');
    }

    return this.firebaseHelperService.updateDocument(this.collectionName, data.id, data);
  }

  // public deletePullRequest(id: string): Observable<any> {
  //   const endpoint = SafeUrlAssembler(this.moduleConfig.environment.baseUrl.api)
  //     .template(ApiEndpoint.pullRequest.delete)
  //     .param({ id })
  //     .toString();
  //
  //   return this.http.delete<any>(endpoint);
  // }
}

import { Injectable } from '@angular/core';
import { IUser } from '@re-code-io/data';
import { EMPTY, from, Observable, of } from 'rxjs';
import { FirebaseHelperService } from './firebase-helper.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firebaseHelperService: FirebaseHelperService) {
  }

  public getUsers(): Observable<IUser[]> {
    // const endpoint = SafeUrlAssembler(this.moduleConfig.environment.baseUrl.api)
    //   .template(ApiEndpoint.user.getAll)
    //   .toString();
    //
    // return this.http.get<IUser[]>(endpoint);

    // return this.firebaseHelperService.getPaginatedCollection('launchSubscribers');
    return of([]);
  }

  public getUser(id: string): Observable<IUser> {
    // const endpoint = SafeUrlAssembler(this.moduleConfig.environment.baseUrl.api)
    //   .template(ApiEndpoint.user.getOne)
    //   .param({ id })
    //   .toString();
    //
    // return this.http.get<IUser>(endpoint);

    return EMPTY;
  }

  public saveUser(userId: string, data: any): Observable<any> {
    return from(this.firebaseHelperService.updateDocument('users', userId, data));
  }

  public deleteUser(id: string): Observable<any> {
    // const endpoint = SafeUrlAssembler(this.moduleConfig.environment.baseUrl.api)
    //   .template(ApiEndpoint.user.delete)
    //   .param({ id })
    //   .toString();
    //
    // return this.http.delete<any>(endpoint);

    return EMPTY;
  }
}

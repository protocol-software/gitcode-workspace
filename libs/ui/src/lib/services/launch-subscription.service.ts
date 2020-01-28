import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ILaunchSubscriber, IQueryParams } from '@re-code-io/data';
import * as firebase from 'firebase';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseHelperService } from './firebase-helper.service';

@Injectable({
  providedIn: 'root',
})
export class LaunchSubscriptionService {
  private launchSubscribersRef: AngularFirestoreCollection<ILaunchSubscriber>;

  constructor(
    private firestore: AngularFirestore,
    private firebaseHelperService: FirebaseHelperService,
  ) {
    this.launchSubscribersRef = this.firestore.collection<ILaunchSubscriber>('launchSubscribers');
  }

  public async addSubscriber(subscriber: ILaunchSubscriber): Promise<firebase.firestore.DocumentReference> {
    if (!subscriber) {
      return;
    }

    return await this.launchSubscribersRef.add(subscriber);
  }

  public getSubscribers(params?: IQueryParams): Observable<ILaunchSubscriber[]> {
    return this.firebaseHelperService.getCollection<ILaunchSubscriber>('launchSubscribers', params);
  }

  public getSubscribersCount(): Observable<number> {
    return this.firebaseHelperService.getCollectionCount('launchSubscribers');
  }

  public getSubscriber(email: string): Observable<any[]> {
    if (!email) {
      return;
    }

    return from(this.launchSubscribersRef.ref.where('email', '==', email).get())
      .pipe(
        map(snapshot => this.firebaseHelperService.getSnapshotData(snapshot)),
      );
  }

  public deleteSubscribers(subscribers: ILaunchSubscriber[]): Observable<any> {
    return forkJoin(subscribers.map(subscriber => this.deleteSubscriber(subscriber)));
  }

  public deleteSubscriber(subscriber: ILaunchSubscriber): Observable<any> {
    if (!subscriber) {
      return of(null);
    }

    return this.firebaseHelperService.deleteDocumentByUniqueKey('launchSubscribers', subscriber, 'email');
  }
}

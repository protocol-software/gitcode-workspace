import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IQueryParams } from '@re-code-io/data';
import * as firebase from 'firebase';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseHelperService } from '@re-code-io/ui';

@Injectable({
  providedIn: 'root',
})
export class MystiquePageSubscriptionService {
  public collectionName: string;
  private collectionRef: AngularFirestoreCollection<any>;

  constructor(
    private firestore: AngularFirestore,
    private firebaseHelperService: FirebaseHelperService,
  ) {
  }

  public init(collectionName: string): void {
    this.collectionName = collectionName;
    this.collectionRef = this.firestore.collection<any>(this.collectionName);
  }

  public async addDocument(subscriber: any): Promise<firebase.firestore.DocumentReference> {
    if (!subscriber) {
      return;
    }

    return await this.collectionRef.add(subscriber);
  }

  public getDocuments(params?: IQueryParams): Observable<any[]> {
    return this.firebaseHelperService.getCollection<any>(this.collectionName, params);
  }

  public getDocumentsCount(): Observable<number> {
    return this.firebaseHelperService.getCollectionCount(this.collectionName);
  }

  public getDocument(docId: string): Observable<any> {
    return this.firebaseHelperService.getDocument(this.collectionName, docId);
  }

  public deleteDocuments(documents: any[]): Observable<any> {
    return forkJoin(documents.map(document => this.deleteDocuments(document)));
  }

  public deleteDocument(docId: string): Observable<any> {
    return from(this.firebaseHelperService.deleteDocument(this.collectionName, docId));
  }
}

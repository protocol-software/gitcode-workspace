import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentData, DocumentReference, Query } from '@angular/fire/firestore';
import { IQueryParams } from '@re-code-io/data';
import * as firebase from 'firebase';
import { from, Observable, of, throwError } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseHelperService {
  constructor(private firestore: AngularFirestore) {
  }

  public getCollectionCount(collectionName: string): Observable<number> {
    const collection = this.firestore.collection(collectionName);

    return from(collection.ref.get()).pipe(
      map(snapshot => snapshot.size),
    );
  }

  public getCollection<T>(collectionName: string, queryParams?: IQueryParams): Observable<T[]> {
    if (!collectionName) {
      return;
    }

    const collection = this.firestore.collection<T>(collectionName);
    let query: CollectionReference | Query = collection.ref;
    if (queryParams) {
      if (queryParams.orderBy) {
        query = query.orderBy(queryParams.orderBy);
      }
    }

    return from(query.get())
      .pipe(
        map(snapshot => this.getSnapshotData<T>(snapshot)),
      );
  }

  public getCollectionValueChanges<T>(collectionName: string): Observable<T[]> {
    if (!collectionName) {
      return;
    }

    const collection = this.firestore.collection<T>(collectionName);
    return collection.valueChanges({ idField: 'id' });
  }

  // public getPaginatedCollection<T>(
  //   collectionName: string,
  //   queryParams?: IQueryParams,
  // ): Observable<IPaginatedResponse<T>> {
  //   if (!collectionName) {
  //     return;
  //   }
  //
  //   const collection = this.firestore.collection<T>(collectionName);
  //   let query: CollectionReference | Query = collection.ref;
  //
  //   if (queryParams) {
  //     if (queryParams.orderBy) {
  //       query = query.orderBy(queryParams.orderBy);
  //     }
  //
  //     if (queryParams.pagination) {
  //       query = query.limit(queryParams.pagination.itemsPerPage);
  //     }
  //   }
  //
  //   const requests = [
  //     from(query.get().then(
  //       (snapshot) => {
  //         if (!queryParams || !queryParams.pagination) {
  //           return snapshot;
  //         }
  //
  //         const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  //         return query.startAfter(lastVisible).get();
  //       },
  //     )),
  //     from(collection.ref.get()),
  //   ];
  //
  //   return forkJoin(requests)
  //     .pipe(
  //       map((responses) => {
  //         const data = this.getSnapshotData<T>(responses[0]);
  //         const pagination = queryParams && queryParams.pagination
  //                            ? queryParams.pagination
  //                            : {
  //             currentPage: 1,
  //             itemsPerPage: responses[1].size,
  //           };
  //
  //         pagination.totalItems = responses[1].size;
  //
  //         return { data, pagination };
  //       }),
  //     );
  // }

  public getDocument<T>(collectionName: string, documentId: string): Observable<T> {
    const collection = this.firestore.collection<T>(collectionName);
    return collection.doc<T>(documentId).valueChanges();
  }

  public getDocumentValueChanges<T>(collectionName: string, documentId: string): Observable<DocumentData> {
    const collection = this.firestore.collection<T>(collectionName);
    return collection.doc<T>(documentId).get().pipe(
      map((snapshot) => {
        return snapshot.data();
      }),
    );
  }

  /**
   * Search for documents by conditions.
   * The conditions are always for an exact-match search.
   *
   * @param {string} collectionName
   * @param conditions The matching conditions in the form of key-value pairs.
   * @returns {Observable<DocumentData>}
   */
  public searchDocuments<T>(collectionName: string, conditions: any): Observable<T[]> {
    const collection = this.firestore.collection<T>(collectionName);
    if (!conditions) {
      throwError('Search condition is required.');
    }

    const conditionKeys = Object.keys(conditions);
    let query = collection.ref.limit(999);
    for (const key of conditionKeys) {
      query = query.where(key, '==', conditions[key]);
    }

    return from(query.get())
      .pipe(
        map(snapshot => this.getSnapshotData<T>(snapshot)),
      );
  }

  /***
   * Add a document to a collection.
   *
   * @param {string} collectionName The collection name segment count must be an odd number.
   * @param {T} data
   * @param {string} documentId If specified, it will be used as the collection ID; otherwise, an auto-generated ID will be used.
   * @returns {Promise<DocumentReference | void>}
   */
  public async addDocument<T>(collectionName: string, data: T, documentId?: string): Promise<DocumentReference | void> {
    const collection = this.firestore.collection<T>(collectionName);

    if (documentId) {
      return await collection.doc(documentId).set(data);
    }

    return await collection.add(data);
  }

  public async updateDocument<T>(collectionName: string, documentId: string, data: T): Promise<void> {
    const collection = this.firestore.collection<T>(collectionName);
    return await collection.doc(documentId).set(data, { merge: true });
  }

  public async deleteDocument<T>(collectionName: string, documentId: string): Promise<void> {
    const collection = this.firestore.collection<T>(collectionName);
    return await collection.doc(documentId).delete();
  }

  public deleteDocumentByUniqueKey<T>(collectionName: string, data: T, uniqueKey: string): Observable<any> {
    if (!collectionName || !data || !uniqueKey) {
      return of(null);
    }

    const collection = this.firestore.collection<T>(collectionName);
    return this.getSnapshotChanges(collectionName).pipe(
      concatMap(
        (items) => {
          const targetItem = items.find(item => item[uniqueKey] === data[uniqueKey]);
          if (!targetItem) {
            // console.warn('Cannot find the item to delete');
            return of(null);
          }

          return from(collection.doc(targetItem.id).delete());
        },
      ),
    );
  }

  public getSnapshotData<T>(snapshot: firebase.firestore.QuerySnapshot): T[] {
    if (snapshot.empty) {
      return [];
    }

    const docs = [];
    snapshot.forEach(
      (doc) => {
        docs.push(doc.data());
      },
    );

    return docs;
  }

  public getSnapshotChanges<T>(collectionName: string): Observable<any> {
    const collection = this.firestore.collection<T>(collectionName);
    return collection.snapshotChanges().pipe(
      map(
        (actions) => {
          return actions.map(
            (action) => {
              const data = action.payload.doc.data() as T;
              const id = action.payload.doc.id;

              return { id, ...data };
            },
          );
        },
      ),
    );
  }
}

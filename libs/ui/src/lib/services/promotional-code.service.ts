import { Injectable } from '@angular/core';
import { IPromotionalCode } from '@re-code-io/data';
import { from, Observable } from 'rxjs';
import { FirebaseHelperService } from './firebase-helper.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionalCodeService {
  private collectionName = 'promotionalCodes';

  constructor(private firebaseHelperService: FirebaseHelperService) {
  }

  public getPromotionalCodes(): Observable<IPromotionalCode[]> {
    return this.firebaseHelperService.getCollectionValueChanges<IPromotionalCode>(`${this.collectionName}`);
  }

  public getPromotionalCode(promotionalCode: string): Observable<IPromotionalCode> {
    return this.firebaseHelperService.getDocument<IPromotionalCode>(
      `${this.collectionName}`,
      promotionalCode,
    );
  }

  public addPromotionalCode(data: IPromotionalCode): Observable<any> {
    return from(this.firebaseHelperService.addDocument(`${this.collectionName}`, data));
  }

  public updatePromotionalCode(documentId: string, data: IPromotionalCode): Observable<any> {
    return from(this.firebaseHelperService.updateDocument(`${this.collectionName}`, documentId, data));
  }

  public deletePromotionalCode(documentId: string): Observable<any> {
    return from(this.firebaseHelperService.deleteDocument<IPromotionalCode>(
      `${this.collectionName}`,
      documentId,
    ));
  }
}

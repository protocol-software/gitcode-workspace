import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { IPromotionalCodeUsage } from '@re-code-io/data';
import { from, Observable } from 'rxjs';
import { FirebaseHelperService } from './firebase-helper.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionalCodeUsageService {
  private collectionName = 'promotionalCodeUsageHistory';

  constructor(private firebaseHelperService: FirebaseHelperService) {
  }

  public getPromotionalCodeUsages(): Observable<IPromotionalCodeUsage[]> {
    return this.firebaseHelperService.getCollectionValueChanges<IPromotionalCodeUsage>(`${this.collectionName}`);
  }

  public getPromotionalCodeUsage(documentId: string): Observable<DocumentData> {
    return this.firebaseHelperService.getDocumentValueChanges<IPromotionalCodeUsage>(
      `${this.collectionName}`,
      documentId,
    );
  }

  public addPromotionalCodeUsage(data: IPromotionalCodeUsage): Observable<any> {
    return from(this.firebaseHelperService.addDocument(
      `${this.collectionName}/usages/${data.promotionalCode}`,
      data,
    ));
  }

  public updatePromotionalCodeUsage(documentId: string, data: IPromotionalCodeUsage): Observable<any> {
    return from(this.firebaseHelperService.updateDocument(`${this.collectionName}`, documentId, data));
  }

  public deletePromotionalCodeUsage(documentId: string): Observable<any> {
    return from(this.firebaseHelperService.deleteDocument<IPromotionalCodeUsage>(
      `${this.collectionName}`,
      documentId,
    ));
  }
}

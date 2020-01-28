import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { IPaymentHistoryItem } from '@re-code-io/data';
import { from, Observable } from 'rxjs';
import { FirebaseHelperService } from './firebase-helper.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentHistoryService {
  private baseCollectionName = 'paymentHistory';

  constructor(private firebaseHelperService: FirebaseHelperService) {
  }

  public getPaymentHistoryItems(userId: string): Observable<IPaymentHistoryItem[]> {
    return this.firebaseHelperService.getCollectionValueChanges<IPaymentHistoryItem>(`${this.baseCollectionName}/users/${userId}`);
  }

  public getPaymentHistoryItem(userId: string, documentId: string): Observable<DocumentData> {
    return this.firebaseHelperService.getDocument<IPaymentHistoryItem>(
      `${this.baseCollectionName}/users/${userId}`,
      documentId,
    );
  }

  public addPaymentHistoryItem(userId: string, data: IPaymentHistoryItem): Observable<any> {
    if (data.transaction && data.transaction.id) {
      return from(this.firebaseHelperService.addDocument(
        `${this.baseCollectionName}/users/${userId}`,
        data,
        data.transaction.id,
      ));
    }

    return from(this.firebaseHelperService.addDocument(`${this.baseCollectionName}/${userId}`, data));
  }

  public deletePaymentHistoryItem(userId: string, documentId: string): Observable<any> {
    return from(this.firebaseHelperService.deleteDocument<IPaymentHistoryItem>(
      `${this.baseCollectionName}/users/${userId}`,
      documentId,
    ));
  }
}

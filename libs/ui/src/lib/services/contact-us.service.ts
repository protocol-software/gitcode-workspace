import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { IContactUs } from '@re-code-io/data';
import { from, Observable } from 'rxjs';
import { FirebaseHelperService } from './firebase-helper.service';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private collectionName = 'contactUs';

  constructor(private firebaseHelperService: FirebaseHelperService) {
  }

  public getContactUsList(): Observable<IContactUs[]> {
    return this.firebaseHelperService.getCollectionValueChanges<IContactUs>(`${this.collectionName}`);
  }

  public getContactUs(documentId: string): Observable<DocumentData> {
    return this.firebaseHelperService.getDocumentValueChanges<IContactUs>(
      `${this.collectionName}`,
      documentId,
    );
  }

  public addContactUs(data: IContactUs): Observable<any> {
    return from(this.firebaseHelperService.addDocument(`${this.collectionName}`, data));
  }

  public updateContactUs(documentId: string, data: IContactUs): Observable<any> {
    return from(this.firebaseHelperService.updateDocument(`${this.collectionName}`, documentId, data));
  }

  public deleteContactUs(documentId: string): Observable<any> {
    return from(this.firebaseHelperService.deleteDocument<IContactUs>(
      `${this.collectionName}`,
      documentId,
    ));
  }
}

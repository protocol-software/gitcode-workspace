import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IInboxMessage } from '@re-code-io/data';
import { Observable } from 'rxjs';
import { FirebaseHelperService } from './firebase-helper.service';

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  constructor(
    private firestore: AngularFirestore,
    private firebaseHelperService: FirebaseHelperService,
  ) {
  }

  public getUserInboxMessages(userId: string): Observable<IInboxMessage[]> {
    return this.firebaseHelperService.getCollectionValueChanges<IInboxMessage>(`inbox/users/${userId}`);
  }

  public markAsRead(userId: string, messageId: string): Promise<void> {
    return this.firebaseHelperService.updateDocument(`inbox/users/${userId}`, messageId, { isRead: true });
  }

  public deleteMessage(userId: string, messageId: string): Promise<void> {
    return this.firebaseHelperService.deleteDocument(`inbox/users/${userId}`, messageId);
  }
}

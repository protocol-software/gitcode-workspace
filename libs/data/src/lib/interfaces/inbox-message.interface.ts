import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface IInboxMessage {
  id?: string;
  message?: string;
  isRead?: boolean;
  isHidden?: boolean;
  createdAt?: Timestamp;
}

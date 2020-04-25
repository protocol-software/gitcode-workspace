import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface ILicense {
  code: string;
  email: string;
  expirationDate?: Date | Timestamp;
  githubRepository: string;
  githubUsername: string;
  lastUpdatedDate?: Date | Timestamp;
  phone: string;
  plan: string;
  paymentMethod?: string;
}

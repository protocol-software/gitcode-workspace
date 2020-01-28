import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface IPaymentHistoryItem {
  lastUpdatedDate?: Date | Timestamp;
  paymentMethod?: string;
  amount?: number | string;
  currency?: string;
  promotionCode?: string;
  transaction?: any;
}

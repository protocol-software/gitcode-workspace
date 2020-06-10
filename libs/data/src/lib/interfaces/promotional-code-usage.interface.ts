import * as firebase from 'firebase';

export interface IPromotionalCodeUsage {
  promotionalCode: string;
  usedBy: string;
  createdAt: Date | firebase.firestore.Timestamp;
}

import * as firebase from 'firebase';
import { PromotionalCodeCategory, PromotionalCodeType } from '../..';

export interface IPromotionalCode {
  code: string;
  type: PromotionalCodeType;
  category: PromotionalCodeCategory;
  discounts?: {
    currency: string;
    amount: number;
  }[];
  startDate: firebase.firestore.Timestamp;
  endDate: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
  createdBy: string;
  isActive: boolean;
}

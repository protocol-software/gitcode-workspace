export interface IContactUs {
  projectName: string;
  companyName: string;
  email: string;
  phone: string;
  topics: string[];
  detail?: string;
  createdAt?: Date | firebase.firestore.Timestamp;
}

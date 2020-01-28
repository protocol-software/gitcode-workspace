import { ILicense } from './license.interface';

export interface IUser {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  lastLogin?: string;
  accessToken?: string;
  providerUserData?: any;
  license?: ILicense;
}

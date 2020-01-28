export class UsersSource {
  public collectionName = 'users';

  public filter: any[] = [
    { field: 'displayName', label: 'Display Name' },
    { field: 'email', label: 'Email' },
  ];
  public list: any[] = [
    { field: 'uid', label: 'UID' },
    { field: 'accessToken', label: 'Access Token' },
    { field: 'displayName', label: 'Display Name' },
    { field: 'email', label: 'Email' },
    { field: 'lastLogin', label: 'Last Login' },
    { field: 'photoURL', label: 'Photo URL' },
  ];

  constructor() {

  }
}

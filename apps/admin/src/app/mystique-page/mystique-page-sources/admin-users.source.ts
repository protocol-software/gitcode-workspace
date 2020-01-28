export class AdminUsersSource {
  public collectionName = 'admins';

  public filter: any[] = [
    { field: 'displayName', label: 'Display Name' },
    { field: 'email', label: 'Email Address' },
  ];
  public list: any[] = [
    { field: 'uid', label: 'UID' },
    { field: 'displayName', label: 'Display Name' },
    { field: 'email', label: 'Email Address' },
    { field: 'photoURL', label: 'Photo Url' },
    { field: 'accessToken', label: 'Access Token' },
    { field: 'lastLogin', label: 'Last Login' },
  ];

  constructor() {

  }
}

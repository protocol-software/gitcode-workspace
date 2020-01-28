export class PaymentHistorySource {
  public collectionName = 'paymentHistory';

  public filter: any[] = [
    { field: 'displayName', label: 'Display Name' },
    { field: 'email', label: 'Email Address' },
  ];
  public list: any[] = [
    { field: 'uid', label: 'UID' },
    { field: 'displayName', label: 'Display Name' },
    { field: 'email', label: 'Email Address' },
    { field: 'photoUrl', label: 'Photo Url' },
    { field: 'accessToken', label: 'Access Token' },
    { field: 'lastLogin', label: 'Last Login' },
  ];

  constructor() {

  }
}

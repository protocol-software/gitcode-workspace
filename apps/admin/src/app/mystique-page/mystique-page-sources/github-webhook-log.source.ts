export class GithubWebhookLogsSource {
  public collectionName = 'github-webhook-logs';

  public filter: any[] = [
    { field: 'action', label: 'Action' },
  ];
  public list: any[] = [
    { field: 'action', label: 'Action' },
    { field: 'installation', label: 'Installation' },
    { field: 'pull_request', label: 'Pull Request' },
    { field: 'repository', label: 'Repository' },
    { field: 'sender', label: 'Sender' },
  ];

  constructor() {

  }
}

export class PrivatePRsSource {
  public collectionName = 'private-pr';

  public filter: any[] = [
    { field: 'authorId', label: 'Author Id' },
    { field: 'status', label: 'status' },
  ];
  public list: any[] = [
    { field: 'authorId', label: 'Author Id' },
    { field: 'title', label: 'Title' },
    { field: 'reviewerId', label: 'Reviewer Id' },
    { field: 'desc', label: 'desc' },
    { field: 'reviewerRating', label: 'Reviewer Rating' },
    { field: 'url', label: 'url' },
    { field: 'createdAt', label: 'Created At' },
    { field: 'updatedAt', label: 'Updated At' },
  ];

  constructor() {

  }
}

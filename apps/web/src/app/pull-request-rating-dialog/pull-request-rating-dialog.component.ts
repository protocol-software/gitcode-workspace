import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { IPullRequest, IRating } from '@re-code-io/data';
import { ImageService } from '@re-code-io/ui';
import { PullRequestsService } from '../pull-requests/pull-requests.service';

@Component({
  selector: 'app-pull-request-rating-dialog',
  templateUrl: './pull-request-rating-dialog.component.html',
  styleUrls: ['./pull-request-rating-dialog.component.scss'],
})
export class PullRequestRatingDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'pull-request-rating-dialog light-theme';

  public pullRequest: IPullRequest;
  public selectedReviewerIds: string[] = [];
  public ratings: IRating[] = [
    { question: 'Please select your satisfaction with the code review.', score: 0 },
    { question: 'Please select the satisfaction with the reviewer who conducted the code review.', score: 0 },
  ];
  public ratingComment = '';

  constructor(
    public dialogRef: MatDialogRef<PullRequestRatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public imageService: ImageService,
    private pullRequestService: PullRequestsService,
  ) {
    this.pullRequest = this.data.pullRequest;

    if (!this.pullRequest) {
      this.dialogRef.close(null);
      throw new Error('No pull request is provided.');
    }
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }

  public saveRating(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.ratings || !this.ratings.length) {
      return;
    }

    this.pullRequest.ratings = this.ratings;

    const sumScore = this.ratings.reduce((sum, rating) => sum + rating.score, 0);
    this.pullRequest.reviewerRating = sumScore / this.ratings.length;
    this.pullRequest.ratingComment = this.ratingComment;
    this.pullRequest.ratedReviewerIds = this.selectedReviewerIds;

    this.pullRequestService.savePullRequest(this.pullRequest).then(
      (result) => {
        this.dialogRef.close(true);
      },
    );
  }

  public onReviewerSelectionChanged(event: MatRadioChange) {
    const reviewerId = event.value;

    if (reviewerId) {
      if (this.selectedReviewerIds.includes(reviewerId)) {
        return;
      }

      this.selectedReviewerIds.push(reviewerId);
      return;
    }

    this.selectedReviewerIds = this.selectedReviewerIds.filter(item => item !== reviewerId);
  }
}

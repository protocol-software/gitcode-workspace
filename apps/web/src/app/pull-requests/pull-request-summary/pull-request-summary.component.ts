import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IPullRequest } from '@re-code-io/data';
import { ImageService } from '@re-code-io/ui';
import { PullRequestRatingDialogService } from '../../pull-request-rating-dialog/pull-request-rating-dialog.service';

@Component({
  selector: 'app-pull-request-summary',
  templateUrl: './pull-request-summary.component.html',
  styleUrls: ['./pull-request-summary.component.scss'],
})
export class PullRequestSummaryComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'pull-request-summary light-theme';

  @Input() public pullRequest: IPullRequest;

  constructor(
    public imageService: ImageService,
    private pullRequestRatingDialogService: PullRequestRatingDialogService,
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public goToPR(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.pullRequest || !this.pullRequest.url) {
      return;
    }

    window.open(this.pullRequest.url, '_blank');
  }

  public openRatingDialog(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.pullRequestRatingDialogService.open({
      pullRequest: this.pullRequest,
    });
  }
}

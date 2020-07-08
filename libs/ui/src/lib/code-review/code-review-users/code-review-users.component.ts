import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, SimpleChange,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'gitcode-code-review-users',
  templateUrl: './code-review-users.component.html',
  styleUrls: ['./code-review-users.component.scss'],
})
export class CodeReviewUsersComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'code-review-user';

  @Input() public users: { name: string, photoUrl: string }[];
  @Input() public userType: 'author' | 'reviewers' = 'author';
  @Input() public isBestReviewer = false;

  public maxStackedPhotoCount = 4;

  constructor() {
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onIsBestReviewerChanged(changes['isBestReviewer']);
  }

  private onIsBestReviewerChanged(change: SimpleChange): void {
    if (typeof change?.currentValue === 'string') {
      this.isBestReviewer = change?.currentValue?.toString().toLowerCase() === 'true';
    }
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}
}

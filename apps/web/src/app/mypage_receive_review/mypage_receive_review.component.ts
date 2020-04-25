import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-receive-review',
  templateUrl: './mypage_receive_review.component.html',
  styleUrls: ['./mypage_receive_review.component.scss'],
})
export class MypageReceiveReviewComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'mypage_receive_review light-theme';

  public selectedReviewerIds: string[] = [];

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void { }

  public ngOnDestroy(): void { }

  public ngAfterViewInit(): void { }

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

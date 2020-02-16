import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatRadioChange, MatGridList } from '@angular/material';
import { FormGroup } from '@angular/forms';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'written-review',
  templateUrl: './written-review.component.html',
  styleUrls: ['./written-review.component.scss'],
})
export class WrittenReviewComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'written-review light-theme';

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

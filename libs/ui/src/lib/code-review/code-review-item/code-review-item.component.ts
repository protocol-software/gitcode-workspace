import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding, HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ICodeReviewItem } from '@gitcode/data';

@Component({
  selector: 'gitcode-code-review-item',
  templateUrl: './code-review-item.component.html',
  styleUrls: ['./code-review-item.component.scss'],
})
export class CodeReviewItemComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'code-review-item';

  @Input() public codeReviewItem: ICodeReviewItem;
  @Output() public itemClicked: EventEmitter<ICodeReviewItem> = new EventEmitter<ICodeReviewItem>();

  public author: { name: string; photoUrl: string; };
  public reviewers: { name: string; photoUrl: string; }[];

  constructor() {
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onCodeReviewItemChanged(changes['codeReviewItem']);
  }

  private onCodeReviewItemChanged(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    const item = <ICodeReviewItem>change.currentValue;
    this.author = { name: item?.author?.displayName, photoUrl: item?.author?.photoURL };
    this.reviewers = item.reviewers.map(reviewer => ({ name: reviewer.name, photoUrl: reviewer.photoUrl }));
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  @HostListener('click', ['$event'])
  onClick($event) {
    this.itemClicked.emit(this.codeReviewItem);
  }
}

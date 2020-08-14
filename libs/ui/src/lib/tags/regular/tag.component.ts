import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { SvgIconService } from '@gitcode/util';

@Component({
  selector: 'gitcode-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'tag';

  @Input() public type: 'none' | 'open' | 'reviewing' | 'reopen' | 'closed' | 'matching' | 'matched' | 'best' | 'grade' | 'deleted' = 'none';
  @Input() public shouldAllowDismiss = false;

  public shouldShowIcon = false;
  public iconMap = {
    open: 'merge',
    reviewing: 'code',
    reopen: 'sync',
    closed: 'done',
    matching: 'matching',
    matched: 'matched',
    best: 'star',
  };
  public defaultText = {
    none: 'Simple Tag',
    open: '오픈',
    reviewing: '코드리뷰 중',
    reopen: '재오픈',
    closed: '종료',
    matching: '리뷰어매칭 중',
    matched: '리뷰어 매칭완료',
    best: '베스트 리뷰',
    grade: 'Intermediate',
  };

  constructor(private svgIconService: SvgIconService,
              public elementRef: ElementRef,
  ) {
    this.svgIconService.registerIcon('merge', '/assets/icons/merge.svg');
    this.svgIconService.registerIcon('code', '/assets/icons/code.svg');
    this.svgIconService.registerIcon('sync', '/assets/icons/sync.svg');
    this.svgIconService.registerIcon('done', '/assets/icons/done.svg');
    this.svgIconService.registerIcon('matching', '/assets/icons/matching.svg');
    this.svgIconService.registerIcon('matched', '/assets/icons/matched.svg');
    this.svgIconService.registerIcon('star', '/assets/icons/star.svg');
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onTypeChanged(changes['type']);
    this.onShouldAllowDismissChanged(changes['shouldAllowDismiss']);
  }

  private onTypeChanged(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    this.shouldShowIcon = !['none', 'grade'].includes(change.currentValue);
  }

  private onShouldAllowDismissChanged(change: SimpleChange): void {
    if (typeof change?.currentValue === 'string') {
      this.shouldAllowDismiss = change?.currentValue?.toString().toLowerCase() === 'true';
    }
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public dismiss(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.elementRef.nativeElement.remove();
  }
}

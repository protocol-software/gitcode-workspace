import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SvgIconService } from '@gitcode/util';
import { IClipboardResponse } from 'ngx-clipboard';

@Component({
  selector: 'gitcode-snack-copy-button',
  templateUrl: './snack-copy-button.component.html',
  styleUrls: ['./snack-copy-button.component.scss'],
})
export class SnackCopyButtonComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'snack-copy-button';

  @Input() public content: string;
  @Output() public contentCopied: EventEmitter<any> = new EventEmitter<any>();
  @Output() public contentCopyError: EventEmitter<any> = new EventEmitter<any>();

  public isCopied = false;

  constructor(private svgIconService: SvgIconService) {
    this.svgIconService.registerIcon('copy', '/assets/icons/copy.svg');
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public onContentCopied(clipboardResponse: IClipboardResponse) {
    this.isCopied = true;

    this.contentCopied.emit(clipboardResponse);
    setTimeout(
      () => {
        this.isCopied = false;
      },
      2500,
    );
  }

  public onContentCopyError(event: any) {
    this.contentCopyError.emit(event);
  }
}

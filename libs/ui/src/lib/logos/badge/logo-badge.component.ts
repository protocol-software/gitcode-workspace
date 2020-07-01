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
import { SvgIconService } from '@gitcode/util';

@Component({
  selector: 'gitcode-logo-badge',
  templateUrl: './logo-badge.component.html',
  styleUrls: ['./logo-badge.component.scss'],
})
export class LogoBadgeComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'logo-badge';

  @Input() public color: 'black' | 'white' | 'charcoal' | 'yellow' | 'pink' | 'green' | 'blue' = 'black';
  @Input() public size: 'small' | 'medium' | 'large' = 'medium';

  constructor(private svgIconService: SvgIconService) {
    this.svgIconService.registerIcon('logo', '/assets/icons/logo.svg');
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}
}

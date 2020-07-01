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
  selector: 'gitcode-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'logo';

  @Input() public color: 'black' | 'white' | 'charcoal' | 'yellow' | 'pink' | 'green' | 'blue' = 'black';
  @Input() public size: 'small' | 'medium' | 'large' = 'medium';
  @Input() public variant: 'icon' | 'full' | 'button' = 'icon';

  constructor(private svgIconService: SvgIconService) {
    this.svgIconService.registerIcon('logo', '/assets/icons/logo.svg');
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}
}

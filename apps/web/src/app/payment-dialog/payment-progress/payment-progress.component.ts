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

@Component({
  selector: 'app-payment-progress',
  templateUrl: './payment-progress.component.html',
  styleUrls: ['./payment-progress.component.scss'],
})
export class PaymentProgressComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'payment-progress';

  @Input() public progressStep = 1;

  public steps = [
    'Order',
    'Payment',
    'Completed',
  ];

  constructor() {
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}
}

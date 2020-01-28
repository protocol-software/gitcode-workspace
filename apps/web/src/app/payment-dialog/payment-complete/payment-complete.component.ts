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
import { IUser } from '@re-code-io/data';
import { IPricingCard } from '../../pricing/pricing-card/pricing-card.interface';

@Component({
  selector: 'app-payment-complete',
  templateUrl: './payment-complete.component.html',
  styleUrls: ['./payment-complete.component.scss'],
})
export class PaymentCompleteComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'payment-complete';

  @Input() public pricingCard: IPricingCard;
  @Input() public user: IUser;

  constructor() {
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}
}

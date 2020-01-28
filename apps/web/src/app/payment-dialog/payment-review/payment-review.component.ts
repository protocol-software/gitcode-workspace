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
import { FormControl, Validators } from '@angular/forms';
import { IPromotionalCode } from '@re-code-io/data';
import Big from 'big.js';
import { IPricingCard } from '../../pricing/pricing-card/pricing-card.interface';
import { PricingPlan } from '../../pricing/pricing-card/pricing-plan.enum';

@Component({
  selector: 'app-payment-review',
  templateUrl: './payment-review.component.html',
  styleUrls: ['./payment-review.component.scss'],
})
export class PaymentReviewComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'payment-review';

  @Input() public pricingCard: IPricingCard;
  @Output() public promotionCodeApplied: EventEmitter<IPromotionalCode> = new EventEmitter<IPromotionalCode>();
  @Output() public promotionCodeRemoved: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public priceChanged: EventEmitter<number> = new EventEmitter<number>();

  public isBenefitShown = false;
  public pricingPlan = PricingPlan;
  public promotionCodeFormControl = new FormControl();
  public netAmount: string;

  constructor() {
    this.promotionCodeFormControl.setValidators(Validators.compose([Validators.required]));
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public onPromotionalCodeApplied(promotionalCode: IPromotionalCode) {
    if (!promotionalCode || !promotionalCode.discounts || !promotionalCode.discounts.length) {
      return;
    }

    let discountItem = promotionalCode.discounts.find(item => item.currency === this.pricingCard.currency);
    if (!discountItem) {
      discountItem = promotionalCode.discounts.find(item => item.currency === 'PERCENT');
    }

    this.pricingCard.discount = {
      code: promotionalCode.code,
      value: discountItem.amount,
      currency: discountItem.currency,
    };

    const fullPrice = new Big(this.pricingCard.price);
    this.netAmount = discountItem.currency === 'PERCENT'
                     ? fullPrice.times(1 - (discountItem.amount / 100)).toFixed(2)
                     : fullPrice.minus(discountItem.amount).toFixed(2);

    this.promotionCodeApplied.emit(promotionalCode);
  }

  public removePromotionalCode(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.pricingCard.discount = null;
    this.netAmount = (new Big(this.pricingCard.price)).toFixed(2);
    this.promotionCodeRemoved.emit(true);
  }
}

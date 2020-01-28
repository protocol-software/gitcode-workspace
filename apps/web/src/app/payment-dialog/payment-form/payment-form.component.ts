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
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { IGitHubRepo, IUser } from '@re-code-io/data';
import { GitHubService } from '@re-code-io/ui';
import Big from 'big.js';
import { ICreateOrderRequest, IOnApproveCallbackData, IPayPalConfig } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { IPricingCard } from '../../pricing/pricing-card/pricing-card.interface';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'payment-form';

  @Input() public pricingCard: IPricingCard;
  @Input() public user: IUser;
  @Output() public paid: EventEmitter<any> = new EventEmitter<any>();

  public formGroup: FormGroup;
  public payPalConfig: IPayPalConfig;
  public publicRepositories: IGitHubRepo[];
  public selectedRepo: IGitHubRepo;

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private githubService: GitHubService,
  ) {
    this.formGroup = this.formBuilder.group({
      githubUsername: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      repository: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      isAgreementAccepted: [false, Validators.compose([Validators.requiredTrue])],
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onPricingCardChanges(changes['pricingCard']);
    this.onUserChanges(changes['user']);
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  private onPricingCardChanges(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    this.payPalConfig = {
      style: {
        color: 'gold',
        shape: 'pill',
        size: 'responsive',
        label: 'pay',
        tagline: false,
        // layout: 'vertical',
      },
      currency: 'USD', // this.pricingCard.currency,
      clientId: environment.payPal.clientId,
      createOrderOnClient: this.createOrder.bind(this),
      onApprove: this.onPaymentApproved.bind(this),
    };
  }

  private createOrder(data): ICreateOrderRequest {
    const fullPrice = new Big(this.pricingCard.price);
    let paymentAmount = fullPrice;
    if (this.pricingCard.discount) {
      paymentAmount = this.pricingCard.discount.currency === 'PERCENT'
                      ? fullPrice.times(1 - (
          this.pricingCard.discount.value / 100
        ))
                      : fullPrice.minus(this.pricingCard.discount.value);
    }

    const paymentAmountString = paymentAmount.toFixed(2);
    const paymentCurrency = this.pricingCard.currency;

    return <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: paymentCurrency,
            value: paymentAmountString,
            breakdown: {
              item_total: {
                currency_code: paymentCurrency,
                value: paymentAmountString,
              },
            },
          },
          items: [
            {
              name: this.translateService.instant(this.pricingCard.title),
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: paymentCurrency,
                value: paymentAmountString,
              },
            },
          ],
        },
      ],
    };
  }

  private onPaymentApproved(callbackData: IOnApproveCallbackData, actions): void {
    actions.order.get().then((details) => {
      const data = {
        details,
        formData: this.getFormData(),
      };

      this.paid.emit(data);
    });
  }

  private onUserChanges(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    this.githubService.getRepositories(this.user.providerUserData.github.login).subscribe(
      (repos) => {
        this.publicRepositories = repos;
      },
    );

    this.formGroup.patchValue({
      githubUsername: this.user.providerUserData.github.login,
      email: this.user.providerUserData.github.email,
      // phone: user.providerUserData.github.phone,
    });
  }

  private getFormData(): any {
    let paymentAmount = new Big(this.pricingCard.price);
    if (this.pricingCard.discount) {
      paymentAmount = paymentAmount.minus(this.pricingCard.discount.value);
    }

    const formValue = this.formGroup.getRawValue();

    return {
      amount: paymentAmount.toFixed(2),

      // NOTE: The response from PayPal doesn't tell if it's paid by PayPal balance or a credit/debit card.
      paymentMethod: 'PayPal',
      githubUsername: formValue.githubUsername,
      githubRepository: formValue.repository,
      email: formValue.email,
      phone: formValue.phone,
    };
  }

  public onFormSubmit(event, formValue) {
    event.preventDefault();
    event.stopPropagation();

    const data = this.getFormData();

    this.pay(data).then(
      () => {
        this.paid.emit(data);
      },
    );
  }

  public async pay(data: any) {
    // TODO: open PayPal payment page.
    await window.open(
      'https://www.paypal.com/uk/webapps/mpp/paypal-popup',
      'WIPaypal',
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700',
    );
  }

  public setSelectedRepo(event: MatSelectChange) {
    const repoUrl = event.value;
    this.selectedRepo = this.publicRepositories.find(repo => repo.url === repoUrl);
  }
}

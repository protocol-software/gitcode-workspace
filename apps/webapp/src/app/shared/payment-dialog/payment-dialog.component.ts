import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '@gitcode/data';
import bigJs from 'big.js';
import { IClientAuthorizeCallbackData, ICreateOrderRequest, IPayPalConfig, IPurchaseUnit } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { CurrencyService } from '../../services/currency.service';
import { PayPalService } from '../../services/paypal.service';

@Component({
  selector: 'app-policy-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
})
export class PaymentDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'policy-dialog secondary';

  public formGroup: FormGroup;
  public user: IUser;
  public periods = Array.from(Array(12), (value, index) => index + 1).reverse();
  public isComplete = false;
  public payPalConfig?: IPayPalConfig;
  public unitPriceKRW = 50000;
  public unitPriceUSD: number;
  public currency = 'USD';

  constructor(public dialogRef: MatDialogRef<PaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private currencyService: CurrencyService,
              private angularFirestore: AngularFirestore,
              private payPalService: PayPalService,
  ) {
    this.user = this.data.user;

    this.formGroup = this.formBuilder.group({
      period: [12, Validators.compose([Validators.required])],
      githubId: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      isAgreed: [false, Validators.compose([Validators.requiredTrue])],
    });

    this.monitorValueChanges();

    this.formGroup.patchValue({
      githubId: this.data.githubId,
    });

    this.currencyService.convert('KRW', 'USD', this.unitPriceKRW)
        .subscribe(
          (value) => {
            this.unitPriceUSD = value;
          },
        );
  }

  public ngOnInit(): void {
    this.initPayPalConfig();
  }

  public ngOnDestroy(): void {
  }

  private monitorValueChanges(): void {
    this.onPeriodChanged();
  }

  private onPeriodChanged(): void {
    const control = this.formGroup.get('period');
    control.valueChanges.subscribe(
      (value) => {
        this.initPayPalConfig();
      },
    );
  }

  public onFormSubmitted(event, formValue: any): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // TODO: submit payment information.
    this.payPalService.getToken(environment.payPal.clientId, environment.payPal.clientSecret)
        .subscribe(
          (response) => {
            console.log(response);
          },
        );
  }

  private initPayPalConfig(): void {
    this.payPalConfig = {
      currency: this.currency,
      clientId: environment.payPal.clientId,
      createOrderOnClient: (data) => ({
        intent: 'CAPTURE',
        purchase_units: this.getPayPalPurchaseUnits(),
      }) as ICreateOrderRequest,
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        size: 'small',
        color: 'gold',
        shape: 'pill',
        tagline: false,
      },
      onApprove: (data, actions) => {
        // console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          // console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: async (data) => {
        // console.log(
        //   'onClientAuthorization - you should probably inform your server about completed transaction at this point',
        //   data);

        await this.savePaymentData(data);
        this.isComplete = true;
        // this.dialogRef.close();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  private getPayPalPurchaseUnits(): IPurchaseUnit[] {
    const period = this.formGroup.get('period').value;
    const totalPaymentAmount = new bigJs(this.unitPriceUSD).times(+period).toFixed(2);

    return [
      {
        amount: {
          currency_code: this.currency,
          value: String(totalPaymentAmount),
          breakdown: {
            item_total: {
              currency_code: this.currency,
              value: String(totalPaymentAmount),
            },
          },
        },
        items: [
          {
            name: 'Code Review Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: this.currency,
              value: String(totalPaymentAmount),
            },
          },
        ],
      },
    ];
  }

  private async savePaymentData(paymentGatewayData: IClientAuthorizeCallbackData): Promise<any> {
    const data = { paymentGatewayData, formData: this.formGroup.value };
    await this.angularFirestore.collection('payments').add(data);
  }
}

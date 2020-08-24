import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPayPalProductRequest, IUser, PayPalProductType } from '@gitcode/data';
import bigJs from 'big.js';
import { ICreateOrderRequest, IPayPalConfig, IPurchaseUnit } from 'ngx-paypal';
import { concatMap, finalize } from 'rxjs/operators';
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
  public cycles = Array.from(Array(12), (value, index) => index + 1).reverse();
  public isComplete = false;
  public payPalConfig?: IPayPalConfig;
  public unitPriceKRW = 50000;
  public unitPriceUSD: number;
  public currency = 'USD';
  public isInProgress = false;

  constructor(public dialogRef: MatDialogRef<PaymentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private currencyService: CurrencyService,
              private angularFirestore: AngularFirestore,
              private payPalService: PayPalService,
  ) {
    this.user = this.data.user;

    this.formGroup = this.formBuilder.group({
      cycles: [12, Validators.compose([Validators.required])],
      githubId: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      isAgreed: [false, Validators.compose([Validators.requiredTrue])],
      unitPriceUSD: [null, Validators.compose([Validators.required, Validators.min(0.01)])],
    });

    this.monitorValueChanges();

    this.formGroup.patchValue({
      githubId: this.data.githubId,
    });

    this.currencyService.convert('KRW', 'USD', this.unitPriceKRW)
        .subscribe(
          (value) => {
            this.unitPriceUSD = value;
            this.formGroup.get('unitPriceUSD').setValue(value);
          },
        );
  }

  public ngOnInit(): void {
    this.initPayPalConfig();
  }

  public ngOnDestroy(): void {
  }

  private monitorValueChanges(): void {
    this.onCyclesChanged();
  }

  private onCyclesChanged(): void {
    const control = this.formGroup.get('cycles');
    control.valueChanges.subscribe(
      (value) => {
        this.initPayPalConfig();
      },
    );
  }

  public submitForm(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const formValue = this.formGroup.value;

    // TODO: submit payment information.
    //  Product and plan creations are one-time operations.
    //  They should be created only if they have not been created before.
    //  However, price in a plan is dynamic (based on the exchange rate).
    //  Find a solution for this case.
    let payPalAccessToken = null;
    let paymentProductRequest: IPayPalProductRequest = null;
    let paymentProductResponse = null;
    let paymentPlanRequest = null;
    let paymentPlanResponse = null;
    let paymentSubscriptionRequest = null;
    let paymentSubscriptionResponse = null;

    this.isInProgress = true;
    this.payPalService.getToken(environment.payPal.clientId, environment.payPal.clientSecret)
        .pipe(
          concatMap(token => {
            payPalAccessToken = token.access_token;

            // Ref: https://developer.paypal.com/docs/api/catalog-products/v1/
            paymentProductRequest = {
              name: 'Code Review Subscription',
              description: `Code Review Monthly Subscription (Finite Plan)`,
              type: PayPalProductType.SERVICE,
              category: 'SOFTWARE',
            };

            return this.payPalService.createProduct(paymentProductRequest, payPalAccessToken);
          }),
          concatMap(product => {
            paymentProductResponse = product;
            paymentPlanRequest = this.payPalService.generatePlan(product, formValue);
            return this.payPalService.createPlan(
              paymentPlanRequest,
              payPalAccessToken,
            );
          }),
          concatMap(plan => {
            paymentPlanResponse = plan;
            paymentSubscriptionRequest = this.payPalService.generateSubscription(plan, formValue);
            return this.payPalService.createSubscription(
              paymentSubscriptionRequest,
              payPalAccessToken,
            );
          }),
          finalize(() => {
            this.isInProgress = false;
          }),
        )
        .subscribe(
          async (response) => {
            paymentSubscriptionResponse = response;

            await this.savePaymentData({
              product: {
                request: paymentProductRequest,
                response: paymentProductResponse,
              },
              plan: {
                request: paymentPlanRequest,
                response: paymentPlanResponse,
              },
              subscription: {
                request: paymentSubscriptionRequest,
                response: paymentSubscriptionResponse,
              },
            });

            this.dialogRef.close(response);
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
    const cycles = this.formGroup.get('cycles').value;
    const totalPaymentAmount = new bigJs(this.unitPriceUSD).times(+cycles).toFixed(2);

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

  private async savePaymentData(paymentGatewayData: any): Promise<any> {
    const data = { paymentGatewayData, formData: this.formGroup.value };
    await this.angularFirestore.collection('payments').add(data);
  }
}

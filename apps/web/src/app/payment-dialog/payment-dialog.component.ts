import { ChangeDetectorRef, Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ILicense, IPaymentHistoryItem, IPromotionalCode, IPromotionalCodeUsage, IUser } from '@re-code-io/data';
import { AuthService, PaymentHistoryService, PromotionalCodeUsageService, UserService } from '@re-code-io/ui';
import * as moment from 'moment';
import { nanoid } from 'nanoid';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IPricingCard } from '../pricing/pricing-card/pricing-card.interface';
import { PricingPlan } from '../pricing/pricing-card/pricing-plan.enum';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
})
export class PaymentDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'payment-dialog light-theme';

  public pricingCard: IPricingCard;
  public progressStep = 1;
  public user: IUser;
  public pricingPlan = PricingPlan;

  private appliedPromotionCode: string;

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private userService: UserService,
    private paymentHistoryService: PaymentHistoryService,
    private promotionalCodeUsageService: PromotionalCodeUsageService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.pricingCard = this.data.pricingCard;

    this.authService.user$.pipe(
      tap(
        (user) => {
          this.user = user;
        },
      ),
    ).subscribe();
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }

  public onPaid(data: any) {
    const purchaseUnits = data.details.purchase_units;
    if (!purchaseUnits || !purchaseUnits.length) {
      console.error(data);
    }

    const paymentAmount = purchaseUnits[0].amount;

    const paymentHistoryItem: IPaymentHistoryItem = {
      lastUpdatedDate: moment().toDate(),
      paymentMethod: data.formData.paymentMethod,
      amount: paymentAmount.value,
      currency: paymentAmount.currency_code,
      promotionCode: this.appliedPromotionCode || '',
      transaction: data.details,
    };

    // 1234567890abcdef
    const licenseCode = this.user.license
                        ? this.user.license.code || nanoid(32)
                        : nanoid(32);

    let expirationDate = moment().add(9999, 'day').endOf('day').toDate();

    if (this.pricingCard.plan === PricingPlan.SUBSCRIPTION) {
      expirationDate = !this.user.license || !this.user.license.expirationDate
                       ? moment().add(1, 'month').add(1, 'day').endOf('day').toDate()
                       : moment.unix(this.user.license.expirationDate['seconds'])
                               .add(1, 'month')
                               .endOf('day')
                               .toDate();
    }

    const license: ILicense = {
      expirationDate,
      code: licenseCode,
      plan: this.pricingPlan[this.pricingCard.plan],
      githubUsername: data.formData.githubUsername,
      githubRepository: data.formData.githubRepository,
      email: data.formData.email,
      phone: data.formData.phone,
      lastUpdatedDate: new Date(),
    };

    const requests = [
      this.paymentHistoryService.addPaymentHistoryItem(this.user.uid, paymentHistoryItem),
      this.userService.saveUser(this.user.uid, { license }),
    ];

    if (this.appliedPromotionCode) {
      const codeUsage: IPromotionalCodeUsage = {
        promotionalCode: this.appliedPromotionCode,
        usedBy: this.user.uid,
        createdAt: new Date(),
      };

      requests.push(this.promotionalCodeUsageService.addPromotionalCodeUsage(codeUsage));
    }

    this.pricingCard.discount = null;

    forkJoin(requests).subscribe(
      (result) => {
        this.progressStep = 3;
        this.cdRef.detectChanges();
      },
    );
  }

  public onPromotionCodeApplied(promotionalCode: IPromotionalCode) {
    this.appliedPromotionCode = promotionalCode.code;
  }

  public onPromotionCodeRemoved(isRemoved: boolean) {
    if (!isRemoved) {
      return;
    }

    this.appliedPromotionCode = null;
  }
}

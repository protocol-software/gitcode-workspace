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
import { TranslateService } from '@ngx-translate/core';
import { IUser, OAuthProvider } from '@re-code-io/data';
import { AuthService, DialogService } from '@re-code-io/ui';
import { PaymentDialogService } from '../../payment-dialog/payment-dialog.service';
import { PricingRequestDialogService } from '../../pricing-request-dialog/pricing-request-dialog.service';
import { IPricingCard } from './pricing-card.interface';
import { PricingCategory } from './pricing-category.enum';
import { PricingPlan } from './pricing-plan.enum';

@Component({
  selector: 'app-pricing-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.scss'],
})
export class PricingCardComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'pricing-card light-theme';

  @Input() public pricingCard: IPricingCard;

  public pricingCategory = PricingCategory;
  public pricingPlan = PricingPlan;
  public user: IUser;

  constructor(
    private pricingRequestDialogService: PricingRequestDialogService,
    private dialogService: DialogService,
    private paymentDialogService: PaymentDialogService,
    private authService: AuthService,
    private translateService: TranslateService,
  ) {
    this.authService.user$.subscribe(
      (user) => {
        this.user = user;
      },
    );
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public purchase(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const data = {
      pricingCard: this.pricingCard,
    };

    this.paymentDialogService.open(data);
  }

  public requestQuote(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const dialogClosed$ = this.pricingRequestDialogService.open();
    dialogClosed$.subscribe(
      (result) => {
        if (!result) {
          return;
        }

        const title = this.translateService.instant('pricingRequestAlert.success.title');
        const message = this.translateService.instant('pricingRequestAlert.success.message');
        const okButtonText = this.translateService.instant('pricingRequestAlert.success.ok');

        this.dialogService.alert(
          title,
          message,
          okButtonText,
        );
      },
    );
  }

  public signIn(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.authService.signInOAuth(OAuthProvider.GITHUB).then(
      () => {
        this.purchase(null);
      },
    );
  }
}

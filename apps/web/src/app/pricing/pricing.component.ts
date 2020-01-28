import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '@re-code-io/ui';
import { ContactUsDialogService } from '../contact-us-dialog/contact-us-dialog.service';
import { IPricingCard } from './pricing-card/pricing-card.interface';
import { PricingCategory } from './pricing-card/pricing-category.enum';
import { PricingPlan } from './pricing-card/pricing-plan.enum';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'pricing light-theme';

  public individualPricingCards: IPricingCard[] = [
    {
      category: PricingCategory.INDIVIDUAL,
      plan: PricingPlan.SUBSCRIPTION,
      title: 'pricing.pricingCard.individual.subscription.title',
      description: 'pricing.pricingCard.individual.subscription.description',
      benefits: [
        'pricing.pricingCard.individual.subscription.benefits.0',
        'pricing.pricingCard.individual.subscription.benefits.1',
        'pricing.pricingCard.individual.subscription.benefits.2',
        'pricing.pricingCard.individual.subscription.benefits.3',
      ],
      currency: 'USD',
      price: 42.99, // 50000,
    },
    {
      category: PricingCategory.INDIVIDUAL,
      plan: PricingPlan.ON_DEMAND,
      title: 'pricing.pricingCard.individual.onDemand.title',
      description: 'pricing.pricingCard.individual.onDemand.description',
      benefits: [
        'pricing.pricingCard.individual.onDemand.benefits.0',
        'pricing.pricingCard.individual.onDemand.benefits.1',
        'pricing.pricingCard.individual.onDemand.benefits.2',
        'pricing.pricingCard.individual.onDemand.benefits.3',
      ],
      currency: 'USD',
      price: 678.99, // 790000,
    },
  ];

  public corporatePricingCards: IPricingCard[] = [
    {
      category: PricingCategory.CORPORATION,
      plan: PricingPlan.SUBSCRIPTION,
      title: 'pricing.pricingCard.corporation.subscription.title',
      description: 'pricing.pricingCard.corporation.subscription.description',
      benefits: [
        'pricing.pricingCard.corporation.subscription.benefits.0',
        'pricing.pricingCard.corporation.subscription.benefits.1',
        'pricing.pricingCard.corporation.subscription.benefits.2',
        'pricing.pricingCard.corporation.subscription.benefits.3',
      ],
      currency: 'USD',
      price: 107.99, // 125000,
    },
    {
      category: PricingCategory.CORPORATION,
      plan: PricingPlan.ON_DEMAND,
      title: 'pricing.pricingCard.corporation.onDemand.title',
      description: 'pricing.pricingCard.corporation.onDemand.description',
      benefits: [
        'pricing.pricingCard.corporation.onDemand.benefits.0',
        'pricing.pricingCard.corporation.onDemand.benefits.1',
        'pricing.pricingCard.corporation.onDemand.benefits.2',
        'pricing.pricingCard.corporation.onDemand.benefits.3',
      ],
      currency: 'USD',
      price: 1718.99, // 2000000,
    },
  ];

  constructor(
    private contactUsDialogService: ContactUsDialogService,
    private dialogService: DialogService,
    private translateService: TranslateService,
  ) {
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public openContactUsDialog(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const dialogClosed = this.contactUsDialogService.open();
    dialogClosed.subscribe(
      (result) => {
        if (!result) {
          return;
        }

        this.dialogService.alert(
          this.translateService.instant('contactUsAlert.success.title'),
          this.translateService.instant('contactUsAlert.success.message'),
          this.translateService.instant('contactUsAlert.success.ok'),
        );
      },
    );
  }
}

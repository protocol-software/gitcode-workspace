import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@re-code-io/ui';
import { NumeralModule } from 'ngx-numeral';
import { ContactUsDialogModule } from '../contact-us-dialog/contact-us-dialog.module';
import { LayoutModule } from '../layout/layout.module';
import { PaymentDialogModule } from '../payment-dialog/payment-dialog.module';
import { PricingRequestDialogModule } from '../pricing-request-dialog/pricing-request-dialog.module';
import { PricingCardComponent } from './pricing-card/pricing-card.component';
import { PricingComponent } from './pricing.component';
import { PricingRoutingModule } from './pricing.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ContactUsDialogModule,
    LayoutModule,
    PricingRoutingModule,
    MatTabsModule,
    MatButtonModule,
    NumeralModule,
    PaymentDialogModule,
    PricingRequestDialogModule,
    TranslateModule,
    UiModule,
  ],
  declarations: [
    PricingCardComponent,
    PricingComponent,
  ],
  providers: [],
  exports: [PricingComponent],
})
export class PricingModule {}

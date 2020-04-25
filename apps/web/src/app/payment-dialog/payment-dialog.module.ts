import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@re-code-io/ui';
import { MomentModule } from 'ngx-moment';
import { NgxPayPalModule } from 'ngx-paypal';
import { PromotionalCodeModule } from '../promotional-code/promotional-code.module';
import { PaymentCompleteComponent } from './payment-complete/payment-complete.component';
import { PaymentDialogComponent } from './payment-dialog.component';
import { PaymentDialogService } from './payment-dialog.service';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentProgressComponent } from './payment-progress/payment-progress.component';
import { PaymentReviewComponent } from './payment-review/payment-review.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MomentModule,
    NgxPayPalModule,
    PromotionalCodeModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    UiModule,
    MatSelectModule,
  ],
  declarations: [
    PaymentCompleteComponent,
    PaymentDialogComponent,
    PaymentFormComponent,
    PaymentProgressComponent,
    PaymentReviewComponent,
  ],
  providers: [
    PaymentDialogService,
  ],
  exports: [PaymentDialogComponent],
  entryComponents: [PaymentDialogComponent],
})
export class PaymentDialogModule {}

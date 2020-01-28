import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@re-code-io/ui';
import { PricingRequestDialogComponent } from './pricing-request-dialog.component';
import { PricingRequestDialogService } from './pricing-request-dialog.service';
import { PricingRequestFormComponent } from './pricing-request-form/pricing-request-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    UiModule,
    TranslateModule,
  ],
  declarations: [
    PricingRequestDialogComponent,
    PricingRequestFormComponent,
  ],
  providers: [
    PricingRequestDialogService,
  ],
  exports: [PricingRequestDialogComponent],
  entryComponents: [PricingRequestDialogComponent],
})
export class PricingRequestDialogModule {}

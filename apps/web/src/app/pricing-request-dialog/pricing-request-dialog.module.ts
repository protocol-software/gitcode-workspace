import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

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

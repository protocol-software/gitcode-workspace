import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PaymentDialogComponent } from './payment-dialog.component';
import { PaymentDialogService } from './payment-dialog.service';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
    imports: [
        CommonModule,

        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule,
    ],
  declarations: [PaymentDialogComponent],
  providers: [
    PaymentDialogService,
  ],
  exports: [PaymentDialogComponent],
  entryComponents: [PaymentDialogComponent],
})
export class PaymentDialogModule {}

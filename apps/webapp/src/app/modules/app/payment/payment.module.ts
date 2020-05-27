import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [PaymentComponent],
    imports: [
        CommonModule,
        MatIconModule
    ]
})
export class PaymentModule { }

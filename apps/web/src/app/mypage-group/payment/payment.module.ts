import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import {ComponentNavModule} from '../../component-nav/component-nav.module';

@NgModule({
  declarations: [PaymentComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ComponentNavModule,
  ],
  exports:[
    PaymentComponent,
    
  ],
})
export class PaymentModule { }

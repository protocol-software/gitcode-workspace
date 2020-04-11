import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivatePrRoutingModule } from './private-pr-routing.module';
import { PrivatePrComponent } from './private-pr.component';

@NgModule({
  declarations: [PrivatePrComponent],
  imports: [
    CommonModule,
    PrivatePrRoutingModule
  ],
  exports:[
    PrivatePrComponent,
  ],
})
export class PrivatePrModule { }

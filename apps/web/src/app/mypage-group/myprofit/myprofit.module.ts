import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyprofitRoutingModule } from './myprofit-routing.module';
import { MyprofitComponent } from './myprofit.component';


@NgModule({
  declarations: [MyprofitComponent],
  imports: [
    CommonModule,
    MyprofitRoutingModule
  ],
  exports: [
    MyprofitComponent,
  ]
  
})
export class MyprofitModule { }

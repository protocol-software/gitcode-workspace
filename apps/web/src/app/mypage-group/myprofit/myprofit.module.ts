import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyprofitRoutingModule } from './myprofit-routing.module';
import { MyprofitComponent } from './myprofit.component';
import { CustomModuleModule} from '../../custom-module/custom-module.module';

@NgModule({
  declarations: [MyprofitComponent],
  imports: [
    CommonModule,
    MyprofitRoutingModule,
    CustomModuleModule,
  ],
  exports: [
    MyprofitComponent,
  ]
  
})
export class MyprofitModule { }

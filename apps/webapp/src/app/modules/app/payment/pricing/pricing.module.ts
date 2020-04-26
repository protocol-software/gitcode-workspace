import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';
import {PricingRoutes} from './pricing.routing';

@NgModule({
  declarations: [PricingComponent],
  imports: [
    RouterModule.forChild(PricingRoutes),
    CommonModule
  ]
})
export class PricingModule { }

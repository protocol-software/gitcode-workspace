import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { LayoutModule } from '../layout/layout.module';
import { LandingComponent } from './landing.component';
import { LandingResolver } from './landing.resolver';
import { LandingRoutingModule } from './landing.routing.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    LandingRoutingModule,
    MatButtonModule,
  ],
  declarations: [LandingComponent],
  providers: [
    LandingResolver,
  ],
  exports: [LandingComponent],
})
export class LandingModule {}

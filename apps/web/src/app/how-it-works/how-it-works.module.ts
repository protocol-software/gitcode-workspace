import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../layout/layout.module';
import { HowItWorksComponent } from './how-it-works.component';
import { HowItWorksRoutingModule } from './how-it-works.routing.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    HowItWorksRoutingModule,
    TranslateModule,
  ],
  declarations: [HowItWorksComponent],
  providers: [],
  exports: [HowItWorksComponent],
})
export class HowItWorksModule {}

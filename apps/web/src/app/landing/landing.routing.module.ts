import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { LandingComponent } from './landing.component';
import { LandingResolver } from './landing.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        // data: {
        //   isDarkTheme: false,
        // },
        children: [
          { path: '', resolve: { prefetch: LandingResolver }, component: LandingComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LandingRoutingModule {
}

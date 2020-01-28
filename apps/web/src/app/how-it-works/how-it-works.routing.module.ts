import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HowItWorksComponent } from './how-it-works.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        // data: {
        //   isDarkTheme: false,
        // },
        // canActivate: [AuthGuardService],
        children: [
          { path: '', component: HowItWorksComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class HowItWorksRoutingModule {
}

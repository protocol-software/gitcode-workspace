import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { WrittenReviewComponent } from './written-review.component';

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
          { path: '', component: WrittenReviewComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class WrittenReviewRoutingModule {
}

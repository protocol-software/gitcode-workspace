import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { MypageReceiveReviewComponent } from './mypage_receive_review.component';

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
          { path: '', component: MypageReceiveReviewComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MypageReceiveReviewRoutingModule {
}

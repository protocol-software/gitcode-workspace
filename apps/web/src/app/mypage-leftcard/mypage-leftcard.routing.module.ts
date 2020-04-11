import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { MypageLeftcardComponent } from './mypage-leftcard.component';

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
          { path: '', component: MypageLeftcardComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MypageLeftcardRoutingModule {
}

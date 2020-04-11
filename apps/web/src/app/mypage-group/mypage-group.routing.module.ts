import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { MypageGroupComponent } from './mypage-group.component';

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
          { path: '', component: MypageGroupComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MypageGroupRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { MypagePublicPRComponent } from './mypage_public_pr.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
    
        children: [
          { path: '', component: MypagePublicPRComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MypagePublicPRRoutingModule {
}

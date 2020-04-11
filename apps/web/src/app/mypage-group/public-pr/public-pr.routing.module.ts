import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PublicPRComponent } from './public-pr.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
    
        children: [
          { path: '', component: PublicPRComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PublicPRRoutingModule {
}

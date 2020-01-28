import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '@re-code-io/ui';
import { LayoutComponent } from '../layout/layout.component';
import { MystiqueComponent } from './mystique-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        // data: {
        //   isDarkTheme: false,
        // },
        canActivate: [AuthGuardService],
        children: [
          { path: '', component: MystiqueComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MystiqueRoutingModule {
}

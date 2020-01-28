import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { PullRequestsComponent } from './pull-requests.component';
import { PullRequestsResolver } from './pull-requests.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        // data: {
        //   isDarkTheme: false,
        // },
        canActivate: [AuthGuard],
        children: [
          { path: '', resolve: { prefetch: PullRequestsResolver }, component: PullRequestsComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PullRequestsRoutingModule {
}

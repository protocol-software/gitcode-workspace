import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '@re-code-io/ui';
import { LayoutComponent } from '../layout/layout.component';
import { SubscribersComponent } from './subscribers.component';
import { SubscribersResolver } from './subscribers.resolver';

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
          { path: '', resolve: { prefetch: SubscribersResolver }, component: SubscribersComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SubscribersRoutingModule {
}

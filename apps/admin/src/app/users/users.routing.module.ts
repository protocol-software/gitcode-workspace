import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '@re-code-io/ui';
import { UsersComponent } from './users.component';
import { UsersResolver } from './users.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        // component: LayoutComponent,
        // data: {
        //   isDarkTheme: false,
        // },
        canActivate: [AuthGuardService],
        children: [
          { path: '', resolve: { prefetch: UsersResolver }, component: UsersComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}

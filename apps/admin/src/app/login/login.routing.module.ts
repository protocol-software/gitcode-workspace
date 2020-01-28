import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginResolver } from './login.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        // component: LayoutComponent,
        // data: {
        //   isDarkTheme: false,
        // },
        // canActivate: [AuthGuardService],
        children: [
          { path: '', resolve: { prefetch: LoginResolver }, component: LoginComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}

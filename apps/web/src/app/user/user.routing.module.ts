import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserResolver } from './user.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '', resolve: { prefetch: UserResolver }, component: UserComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UserRoutingModule {
}

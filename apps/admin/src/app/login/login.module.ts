import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';
import { LoginResolver } from './login.resolver';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,

    LoginRoutingModule,
  ],
  declarations: [LoginComponent],
  providers: [
    LoginResolver,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}

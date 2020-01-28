import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserResolver } from './user.resolver';
import { UserRoutingModule } from './user.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
  ],
  declarations: [UserComponent],
  providers: [
    UserResolver,
  ],
  exports: [UserComponent],
})
export class UserModule {}

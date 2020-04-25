import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UiModule } from '@re-code-io/ui';
import { UsersComponent } from './users.component';
import { UsersResolver } from './users.resolver';
import { UsersRoutingModule } from './users.routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,

    UsersRoutingModule,
    UiModule,
    MatButtonModule,
  ],
  declarations: [UsersComponent],
  providers: [
    UsersResolver,
  ],
  exports: [UsersComponent],
})
export class UsersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackCodeComponent } from './snack-code.component';
import {RouterModule} from '@angular/router';
import {SnackCodeRoutes} from './snack-code.routing';

@NgModule({
  declarations: [SnackCodeComponent],
  imports: [
    RouterModule.forChild(SnackCodeRoutes),
    CommonModule
  ]
})
export class SnackCodeModule { }

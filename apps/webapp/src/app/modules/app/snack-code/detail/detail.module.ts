import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import {RouterModule} from '@angular/router';
import {DetailRoutes} from './detail.routing';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    RouterModule.forChild(DetailRoutes),
    CommonModule
  ]
})
export class DetailModule { }

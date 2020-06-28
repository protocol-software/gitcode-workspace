import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import {RouterModule} from '@angular/router';
import {ResultRoutes} from './result.routing';

@NgModule({
  declarations: [ResultComponent],
  imports: [
    RouterModule.forChild(ResultRoutes),
    CommonModule
  ]
})
export class ResultModule { }

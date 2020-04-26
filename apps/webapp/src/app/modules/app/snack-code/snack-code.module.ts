import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackCodeComponent } from './snack-code.component';
import {RouterModule} from '@angular/router';
import {SnackCodeRoutes} from './snack-code.routing';
import {SideNavComponent} from './side-nav/side-nav.component';
import {ListComponent} from './list/list.component';

@NgModule({
  declarations: [
    SnackCodeComponent,
    SideNavComponent,
    ListComponent,
  ],
  imports: [
    RouterModule.forChild(SnackCodeRoutes),
    CommonModule
  ]
})
export class SnackCodeModule { }

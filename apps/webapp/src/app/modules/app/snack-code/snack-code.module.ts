import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackCodeComponent } from './snack-code.component';
import {RouterModule} from '@angular/router';
import {SnackCodeRoutes} from './snack-code.routing';
import {SideNavComponent} from './side-nav/side-nav.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {MarkdownModule} from 'ngx-markdown';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SnackCodeComponent,
    SideNavComponent,
    ListComponent,
    DetailComponent,
  ],
  imports: [
    RouterModule.forChild(SnackCodeRoutes),
    CommonModule,
    MarkdownModule,
    MatIconModule,
  ]
})
export class SnackCodeModule { }

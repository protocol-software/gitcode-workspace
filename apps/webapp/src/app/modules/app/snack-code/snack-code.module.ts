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
import {ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../../../shared/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
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
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTableModule,
        SharedModule,
        NgxPaginationModule,

    ]
})
export class SnackCodeModule { }

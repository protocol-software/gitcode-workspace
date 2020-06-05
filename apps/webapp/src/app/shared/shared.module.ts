import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationComponent
    ],
    declarations: [PaginationComponent]
})
export class SharedModule
{
}

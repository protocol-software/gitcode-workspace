import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCodeComponent } from './search-code.component';
import {RouterModule} from '@angular/router';
import {SearchCodeRoutes} from './search-code.routing';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [SearchCodeComponent],
    imports: [
        RouterModule.forChild(SearchCodeRoutes),
        CommonModule,
        MatButtonModule
    ]
})
export class SearchCodeModule { }

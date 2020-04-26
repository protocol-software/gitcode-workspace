import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCodeComponent } from './search-code.component';
import {RouterModule} from '@angular/router';
import {SearchCodeRoutes} from './search-code.routing';

@NgModule({
  declarations: [SearchCodeComponent],
  imports: [
    RouterModule.forChild(SearchCodeRoutes),
    CommonModule
  ]
})
export class SearchCodeModule { }

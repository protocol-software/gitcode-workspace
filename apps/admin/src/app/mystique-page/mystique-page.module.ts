import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UiModule } from '@re-code-io/ui';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutModule } from '../layout/layout.module';
import { MystiquePageFilterComponent } from './mystique-page-filter/mystique-page-filter.component';
import { MystiquePageListComponent } from './mystique-page-list/mystique-page-list.component';
import { MystiqueComponent } from './mystique-page.component';
import { MystiqueRoutingModule } from './mystique-page.routing.module';

@NgModule({
  imports: [
    // Angular modules
    CommonModule,
    ReactiveFormsModule,

    // Third-party modules
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    NgxPaginationModule,

    // Custom modules
    LayoutModule,
    MystiqueRoutingModule,
    UiModule,
  ],
  declarations: [
    MystiquePageFilterComponent,
    MystiquePageListComponent,
    MystiqueComponent,
  ],
  providers: [
    // MystiqueResolver,
  ],
  exports: [MystiqueComponent],
})
export class MystiqueModule {}

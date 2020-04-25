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
import { LaunchSubscriberFilterComponent } from './launch-subscriber-filter/launch-subscriber-filter.component';
import { LaunchSubscriberListComponent } from './launch-subscriber-list/launch-subscriber-list.component';
import { SubscribersComponent } from './subscribers.component';
import { SubscribersResolver } from './subscribers.resolver';
import { SubscribersRoutingModule } from './subscribers.routing.module';

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
    SubscribersRoutingModule,
    UiModule,
  ],
  declarations: [
    LaunchSubscriberFilterComponent,
    LaunchSubscriberListComponent,
    SubscribersComponent,
  ],
  providers: [
    SubscribersResolver,
  ],
  exports: [SubscribersComponent],
})
export class SubscribersModule {}

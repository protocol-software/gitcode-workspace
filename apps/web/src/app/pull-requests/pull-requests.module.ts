import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@re-code-io/ui';
import { StarRatingModule } from 'angular-star-rating';
import { MomentModule } from 'ngx-moment';
import { LayoutModule } from '../layout/layout.module';
import { PullRequestRatingDialogModule } from '../pull-request-rating-dialog/pull-request-rating-dialog.module';
import { PullRequestFilterComponent } from './pull-request-filter/pull-request-filter.component';
import { PullRequestSummaryComponent } from './pull-request-summary/pull-request-summary.component';
import { PullRequestsComponent } from './pull-requests.component';
import { PullRequestsResolver } from './pull-requests.resolver';
import { PullRequestsRoutingModule } from './pull-requests.routing.module';
import { PullRequestsService } from './pull-requests.service';
import { CustomModuleModule } from '../custom-module/custom-module.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MomentModule,
    StarRatingModule.forChild(),
    LayoutModule,
    PullRequestRatingDialogModule,
    PullRequestsRoutingModule,
    TranslateModule,
    UiModule,
    CustomModuleModule,
  ],
  declarations: [
    PullRequestsComponent,
    PullRequestFilterComponent,
    PullRequestSummaryComponent,
  ],
  providers: [
    PullRequestsService,
    PullRequestsResolver,
  ],
  exports: [PullRequestsComponent],
})
export class PullRequestsModule {}

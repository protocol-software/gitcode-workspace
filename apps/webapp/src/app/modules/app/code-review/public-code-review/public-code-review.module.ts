import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { UiModule } from '@gitcode/ui';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FilterPipe,
  LangStatusPipe,
  MyPostFilterPipe,
  StatusPipe,
} from '../../../../services/public-code-review.service';
import { SharedModule } from '../../../../shared/shared.module';
import { CodeReviewFilterComponent } from '../code-review-filter/code-review-filter.component';
import { CodeReviewDetailModule } from './code-review-detail/code-review-detail.module';
import { ConfirmExpertDialog, ExpertEvaluationComponent } from './expert-evaluation/expert-evaluation.component';
// import { PublicCodeReviewComponent, SelectFrameworksPipe} from './public-code-review.component';
import { PublicCodeReviewComponent } from './public-code-review.component';
import { PublicCodeReviewRoutes } from './public-code-review.routing';
import { RequestCodeReviewModule } from './request-code-review/request-code-review.module';

@NgModule({
  declarations: [
    PublicCodeReviewComponent,
    ExpertEvaluationComponent,
    ConfirmExpertDialog,
    // SelectFrameworksPipe,
    MyPostFilterPipe,
    LangStatusPipe,
    StatusPipe,
    FilterPipe,
    CodeReviewFilterComponent,
  ],
  imports: [
    RouterModule.forChild(PublicCodeReviewRoutes),
    SharedModule,

    RequestCodeReviewModule,
    CodeReviewDetailModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    HttpClientModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatPseudoCheckboxModule,
    UiModule,
    TranslateModule,
  ]
  , providers: [],
})
export class PublicCodeReviewModule {
}

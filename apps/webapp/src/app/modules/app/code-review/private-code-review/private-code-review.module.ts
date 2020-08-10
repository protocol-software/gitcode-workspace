import { TextFieldModule } from '@angular/cdk/text-field';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { UiModule } from '@gitcode/ui';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CodeReviewDetailModule } from './code-review-detail/code-review-detail.module';
import { ConfirmExpertDialog, ExpertEvaluationComponent } from './expert-evaluation/expert-evaluation.component';
import { PrivateCodeReviewComponent } from './private-code-review.component';

import { PrivateCodeReviewRoutes } from './private-code-review.routing';
import { RequestCodeReviewModule } from './request-code-review/request-code-review.module';


@NgModule({
  declarations: [
    PrivateCodeReviewComponent, ExpertEvaluationComponent, ConfirmExpertDialog,
  ],
  imports: [
    RouterModule.forChild(PrivateCodeReviewRoutes),
    SharedModule,
    RequestCodeReviewModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    CodeReviewDetailModule,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    UiModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class PrivateCodeReviewModule {
}

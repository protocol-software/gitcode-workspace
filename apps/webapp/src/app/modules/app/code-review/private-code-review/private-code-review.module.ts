import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import {PrivateCodeReviewRoutes} from './private-code-review.routing';
import {PrivateCodeReviewComponent} from './private-code-review.component';
import {MatButtonModule} from '@angular/material/button';
import {RequestCodeReviewModule} from './request-code-review/request-code-review.module';

@NgModule({
  declarations: [
    PrivateCodeReviewComponent
  ],
  imports     : [
    RouterModule.forChild(PrivateCodeReviewRoutes),
    SharedModule,
    MatButtonModule,
    RequestCodeReviewModule,
  ]
})
export class PrivateCodeReviewModule
{
}

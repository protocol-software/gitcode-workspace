import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import {PrivateCodeReviewRoutes} from './private-code-review.routing';
import {PrivateCodeReviewComponent} from './private-code-review.component';

@NgModule({
  declarations: [
    PrivateCodeReviewComponent
  ],
  imports     : [
    RouterModule.forChild(PrivateCodeReviewRoutes),
    SharedModule
  ]
})
export class PrivateCodeReviewModule
{
}

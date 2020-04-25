import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import {PublicCodeReviewRoutes} from './public-code-review.routing';
import {PublicCodeReviewComponent} from './public-code-review.component';

@NgModule({
  declarations: [
    PublicCodeReviewComponent
  ],
  imports     : [
    RouterModule.forChild(PublicCodeReviewRoutes),
    SharedModule
  ]
})
export class PublicCodeReviewModule
{
}

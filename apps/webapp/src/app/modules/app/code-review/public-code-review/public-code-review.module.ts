import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import {PublicCodeReviewRoutes} from './public-code-review.routing';
import {PublicCodeReviewComponent} from './public-code-review.component';
import {MatButtonModule} from '@angular/material/button';
import {RequestCodeReviewModule} from './request-code-review/request-code-review.module';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CodeReviewDetailModule} from "./code-review-detail/code-review-detail.module";

@NgModule({
  declarations: [
    PublicCodeReviewComponent
  ],
    imports: [
        RouterModule.forChild(PublicCodeReviewRoutes),
        SharedModule,
        MatButtonModule,
        RequestCodeReviewModule,
        CodeReviewDetailModule,
        MatCheckboxModule
    ]
})
export class PublicCodeReviewModule
{
}

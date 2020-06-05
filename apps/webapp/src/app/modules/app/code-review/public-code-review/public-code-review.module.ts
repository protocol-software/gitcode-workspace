import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import {PublicCodeReviewRoutes} from './public-code-review.routing';
import {PublicCodeReviewComponent} from './public-code-review.component';
import {ExpertEvaluationComponent, ConfirmExpertDialog} from './expert-evaluation/expert-evaluation.component';
import {RequestCodeReviewModule} from './request-code-review/request-code-review.module';
import {CodeReviewDetailModule} from "./code-review-detail/code-review-detail.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    PublicCodeReviewComponent,ExpertEvaluationComponent,ConfirmExpertDialog
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

    ]
    ,providers:[
    ]
})
export class PublicCodeReviewModule
{
}

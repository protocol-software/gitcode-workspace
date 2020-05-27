import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";

import {PrivateCodeReviewRoutes} from './private-code-review.routing';
import {PrivateCodeReviewComponent} from './private-code-review.component';
import {RequestCodeReviewModule} from './request-code-review/request-code-review.module';
import {CodeReviewDetailModule} from "./code-review-detail/code-review-detail.module";
import {ExpertEvaluationComponent, ConfirmExpertDialog} from './expert-evaluation/expert-evaluation.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TextFieldModule} from "@angular/cdk/text-field";



@NgModule({
  declarations: [
    PrivateCodeReviewComponent,ExpertEvaluationComponent,ConfirmExpertDialog
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
    ],
    providers: [
        {
            provide: MatDialogRef,
            useValue: {}
        },
    ]
})
export class PrivateCodeReviewModule
{
}

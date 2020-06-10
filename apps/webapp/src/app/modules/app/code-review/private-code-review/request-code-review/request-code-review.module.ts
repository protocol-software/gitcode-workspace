import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';
import { RequestCodeReviewComponent } from './request-code-review.component';
import { RequestCodeReviewService } from './request-code-review.service';
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        TranslateModule,
        MatRadioModule,
        MatSelectModule,
    ],
  declarations: [RequestCodeReviewComponent],
  providers: [
    RequestCodeReviewService,
  ],
  exports: [RequestCodeReviewComponent],
  entryComponents: [RequestCodeReviewComponent],
})
export class RequestCodeReviewModule {}

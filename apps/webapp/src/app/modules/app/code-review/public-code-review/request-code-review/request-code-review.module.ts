import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import {GitHubService} from "../../../../../services/github.service";

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
        FormsModule,
    ],
  declarations: [RequestCodeReviewComponent],
  providers: [
    RequestCodeReviewService,
      GitHubService,

  ],
  exports: [RequestCodeReviewComponent],
  entryComponents: [RequestCodeReviewComponent],
})
export class RequestCodeReviewModule {}

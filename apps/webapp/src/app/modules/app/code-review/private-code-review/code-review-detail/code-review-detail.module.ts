import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";

import { CodeReviewDetailComponent,CodeReviewDetailDialog, CodeReviewDetailDialogBestreview } from './code-review-detail.component';
import { CodeReviewDetailService } from './code-review-detail.service';

@NgModule({

  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    TranslateModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
  ],
  declarations: [CodeReviewDetailComponent,CodeReviewDetailDialog,CodeReviewDetailDialogBestreview],
  providers: [
    CodeReviewDetailService,

  ],
  exports: [CodeReviewDetailComponent],
  entryComponents: [CodeReviewDetailComponent,CodeReviewDetailDialog,CodeReviewDetailDialogBestreview],
})
export class CodeReviewDetailModule { }

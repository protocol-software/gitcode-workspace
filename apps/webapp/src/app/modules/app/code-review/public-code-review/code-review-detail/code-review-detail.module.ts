import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { UiModule } from '@gitcode/ui';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  CodeReviewDetailComponent,
  CodeReviewDetailDialog,
  CodeReviewDetailDialogBestreview,
} from './code-review-detail.component';
import { CodeReviewDetailService } from './code-review-detail.service';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    TranslateModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
    UiModule,
    RouterModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
  ],
  declarations: [CodeReviewDetailComponent, CodeReviewDetailDialog, CodeReviewDetailDialogBestreview],
  providers: [
    CodeReviewDetailService,

  ],
  exports: [CodeReviewDetailComponent],
  entryComponents: [CodeReviewDetailComponent, CodeReviewDetailDialog, CodeReviewDetailDialogBestreview],
})
export class CodeReviewDetailModule {}

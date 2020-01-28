import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
} from '@angular/material';
import { StarRatingModule } from 'angular-star-rating';
import { PullRequestRatingDialogComponent } from './pull-request-rating-dialog.component';
import { PullRequestRatingDialogService } from './pull-request-rating-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,

    StarRatingModule,
  ],
  declarations: [PullRequestRatingDialogComponent],
  providers: [
    PullRequestRatingDialogService,
  ],
  exports: [PullRequestRatingDialogComponent],
  entryComponents: [PullRequestRatingDialogComponent],
})
export class PullRequestRatingDialogModule {}

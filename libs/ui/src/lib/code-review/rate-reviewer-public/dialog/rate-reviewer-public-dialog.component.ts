import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICodeReviewBestAnswer, IRateReviewerPublic } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewer-public-dialog',
  templateUrl: './rate-reviewer-public-dialog.component.html',
  styleUrls: ['./rate-reviewer-public-dialog.component.scss'],
})
export class RateReviewerPublicDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'rate-reviewer-public-dialog';

  public bestAnswer: ICodeReviewBestAnswer;

  constructor(public dialogRef: MatDialogRef<RateReviewerPublicDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.bestAnswer = this.data.bestAnswer;
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }

  public onFormSubmitted(data: IRateReviewerPublic) {
    this.dialogRef.close(data);
  }
}

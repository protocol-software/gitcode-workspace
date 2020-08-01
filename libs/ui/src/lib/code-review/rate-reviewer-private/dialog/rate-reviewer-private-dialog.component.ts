import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICodeReviewBestAnswer, IRateReviewerPublic } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewer-private-dialog',
  templateUrl: './rate-reviewer-private-dialog.component.html',
  styleUrls: ['./rate-reviewer-private-dialog.component.scss'],
})
export class RateReviewerPrivateDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'rate-reviewer-private-dialog';

  public bestAnswer: ICodeReviewBestAnswer;

  constructor(public dialogRef: MatDialogRef<RateReviewerPrivateDialogComponent>,
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

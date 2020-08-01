import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICodeReviewBestAnswer, IRateReviewerPublic } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewee-dialog',
  templateUrl: './rate-reviewee-dialog.component.html',
  styleUrls: ['./rate-reviewee-dialog.component.scss'],
})
export class RateRevieweeDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'rate-reviewee-dialog';

  public bestAnswer: ICodeReviewBestAnswer;

  constructor(public dialogRef: MatDialogRef<RateRevieweeDialogComponent>,
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

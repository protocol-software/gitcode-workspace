import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gitcode-rate-reviewer-public-dialog',
  templateUrl: './rate-reviewer-public-dialog.component.html',
  styleUrls: ['./rate-reviewer-public-dialog.component.scss'],
})
export class RateReviewerPublicDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'rate-reviewer-public-dialog';

  constructor(public dialogRef: MatDialogRef<RateReviewerPublicDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}

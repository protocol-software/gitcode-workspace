import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gitcode-rate-reviewer-private-dialog',
  templateUrl: './rate-reviewer-private-dialog.component.html',
  styleUrls: ['./rate-reviewer-private-dialog.component.scss'],
})
export class RateReviewerPrivateDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'rate-reviewer-private-dialog';

  constructor(public dialogRef: MatDialogRef<RateReviewerPrivateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}

import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './terms-dialog.component.html',
  styleUrls: ['./terms-dialog.component.scss'],
})
export class TermsDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'terms-dialog secondary';

  constructor(
    public dialogRef: MatDialogRef<TermsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}

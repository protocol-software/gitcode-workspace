import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pricing-request-dialog',
  templateUrl: './pricing-request-dialog.component.html',
  styleUrls: ['./pricing-request-dialog.component.scss'],
})
export class PricingRequestDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'pricing-request-dialog';

  constructor(
    public dialogRef: MatDialogRef<PricingRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }

  public onPricingRequestFormSubmitted(isSubmitted: boolean) {
    if (!isSubmitted) {
      return;
    }

    this.dialogRef.close(true);
  }
}

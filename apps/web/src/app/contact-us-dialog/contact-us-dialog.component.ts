import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-us-dialog',
  templateUrl: './contact-us-dialog.component.html',
  styleUrls: ['./contact-us-dialog.component.scss'],
})
export class ContactUsDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'contact-us-dialog light-theme';

  constructor(
    public dialogRef: MatDialogRef<ContactUsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }

  public onFormSubmitted(isSubmitted: boolean) {
    if (!isSubmitted) {
      return;
    }

    this.dialogRef.close(true);
  }
}

import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gitcode-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'confirm-dialog';

  public title: string;
  public message: string;
  public yesButtonText = 'Confirm';
  public noButtonText = 'Cancel';

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}

import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gitcode-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'alert-dialog';

  public title: string;
  public message: string;
  public okButtonText: string;

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}

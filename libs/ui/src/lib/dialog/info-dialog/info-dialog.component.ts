import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'info-dialog';

  public title: string;
  public message: string;
  public shouldShowDefaultActions = true;
  public okButtonText: string;

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data) {
      this.title = this.data.title ? this.data.title : '';
      this.message = this.data.message;
      this.shouldShowDefaultActions = this.data.shouldShowDefaultActions;
      this.okButtonText = this.data.okButtonText || 'OK';
    }
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}

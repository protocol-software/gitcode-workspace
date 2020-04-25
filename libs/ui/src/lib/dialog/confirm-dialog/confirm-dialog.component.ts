import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  public dialogClass: string;
  public title: string;
  public titleClass: string;
  public message: string;
  public messageClass: string;
  public cancel = 'Cancel';
  public yes = 'Confirm';
  public focusedButton: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data) {
      this.dialogClass = this.data.dialogClass ? this.data.dialogClass : '';
      this.title = this.data.title ? this.data.title : '';
      this.titleClass = this.data.titleClass ? this.data.titleClass : '';
      this.message = this.data.message;
      this.messageClass = this.data.messageClass ? this.data.messageClass : '';
      this.cancel = this.data.cancel ? this.data.cancel : this.cancel;
      this.yes = this.data.yes ? this.data.yes : this.yes;
      this.focusedButton = this.data.focusedButton;
    }
  }

  public ngOnInit() {
  }
}

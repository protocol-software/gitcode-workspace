import { Direction } from '@angular/cdk/bidi';
import { Injectable } from '@angular/core';
import { DialogRole, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import * as Immutable from 'immutable';
import { AlertDialogComponent } from './alert/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogConfig = {
    autoFocus: false,
    // backdropClass: 'cdk-overlay-dark-backdrop',
    closeOnNavigation: true,
    direction: 'ltr' as Direction,
    disableClose: true,
    hasBackdrop: true,
    // height: '100vh',
    // minHeight: '100vh',
    maxHeight: '100%',
    // width: '100vw',
    // minWidth: '23.5375rem',
    maxWidth: '100%',
    panelClass: ['app-modal-dialog'],
    // position: <DialogPosition>'bottom',
    restoreFocus: false,
    role: 'dialog' as DialogRole,
  };

  constructor(private dialog: MatDialog) {
  }

  public alert(title: string, message: string, okButtonText: string = 'OK'): MatDialogRef<AlertDialogComponent> {
    let dialogRef: MatDialogRef<AlertDialogComponent>;

    const config: MatDialogConfig = Immutable.Map(this.dialogConfig).toJS();
    config.panelClass = ['app-modal-dialog', 'float'];

    dialogRef = this.dialog.open(AlertDialogComponent, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.okButtonText = okButtonText;

    return dialogRef;
  }

  public confirm(
    title: string,
    message: string,
    yesButtonText = 'OK',
    noButtonText = 'Cancel',
  ): MatDialogRef<ConfirmDialogComponent> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    const config: MatDialogConfig = Immutable.Map(this.dialogConfig).toJS();
    config.panelClass = ['app-modal-dialog', 'float'];

    dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.yesButtonText = yesButtonText;
    dialogRef.componentInstance.noButtonText = noButtonText;

    return dialogRef;
  }
}

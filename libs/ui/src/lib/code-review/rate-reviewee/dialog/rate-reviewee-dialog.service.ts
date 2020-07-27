import { Direction } from '@angular/cdk/bidi';
import { Injectable } from '@angular/core';
import { DialogRole, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import * as Immutable from 'immutable';
import { RateRevieweeDialogComponent } from './rate-reviewee-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class RateRevieweeDialogService {
  private dialogRef: MatDialogRef<RateRevieweeDialogComponent>;
  private dialogConfig = {
    autoFocus: false,
    // backdropClass: 'cdk-overlay-dark-backdrop',
    closeOnNavigation: true,
    direction: 'ltr' as Direction,
    disableClose: false,
    hasBackdrop: true,
    height: '80vh',
    minHeight: '80vh',
    maxHeight: '100%',
    width: '527px',
    // minWidth: '23.5375rem',
    maxWidth: '527px',
    panelClass: ['app-dialog'],
    // position: <DialogPosition>'bottom',
    restoreFocus: false,
    role: 'dialog' as DialogRole,
  };

  constructor(private dialog: MatDialog) {
  }

  public open(data?: any): MatDialogRef<RateRevieweeDialogComponent> {
    const config: MatDialogConfig = Immutable.Map(this.dialogConfig).toJS();
    config.panelClass = ['app-dialog'];
    config.data = data || {};

    this.dialogRef = this.dialog.open(RateRevieweeDialogComponent, config);
    return this.dialogRef;
  }

  public close(): void {
    if (!this.dialogRef) {
      return;
    }

    this.dialogRef.close();
  }
}

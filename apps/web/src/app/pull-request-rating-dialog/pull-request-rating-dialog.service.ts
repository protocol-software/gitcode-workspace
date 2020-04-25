import { Direction } from '@angular/cdk/bidi';
import { Injectable } from '@angular/core';
import { DialogRole, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { PullRequestRatingDialogComponent } from './pull-request-rating-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PullRequestRatingDialogService {
  private dialogRef: MatDialogRef<PullRequestRatingDialogComponent>;

  private dialogConfig = {
    autoFocus: false,
    // backdropClass: 'cdk-overlay-dark-backdrop',
    closeOnNavigation: true,
    direction: <Direction>'ltr',
    disableClose: true,
    hasBackdrop: true,
    height: '100vh',
    // minHeight: '100vh',
    maxHeight: '100%',
    width: '100vw',
    // minWidth: '23.5375rem',
    maxWidth: '100vw',
    panelClass: ['app-dialog'],
    // position: <DialogPosition>'bottom',
    restoreFocus: false,
    role: <DialogRole>'dialog',
  };

  constructor(private dialog: MatDialog) {
  }

  public open(data?: any): Observable<any> {
    const config: MatDialogConfig = this.dialogConfig;
    config.maxWidth = '31.25rem';
    config.panelClass = ['app-dialog'];
    config.data = data || {};

    this.dialogRef = this.dialog.open(PullRequestRatingDialogComponent, config);
    return this.dialogRef.afterClosed();
  }

  public close(): void {
    if (!this.dialogRef) {
      return;
    }

    this.dialogRef.close();
  }
}

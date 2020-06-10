import { Direction } from '@angular/cdk/bidi';
import { Injectable } from '@angular/core';
import { DialogRole, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { CodeReviewDetailComponent } from './code-review-detail.component';



@Injectable({
  providedIn: 'root'
})
export class CodeReviewDetailService {
  private dialogRef: MatDialogRef<CodeReviewDetailComponent>;
  private dialogConfig = {
    autoFocus: false,
    // backdropClass: 'cdk-overlay-dark-backdrop',
    closeOnNavigation: true,
    direction: <Direction>'ltr',
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
    role: <DialogRole>'dialog',
  };

  constructor(private dialog: MatDialog) {
  }
  public open(data?: any): Observable<any> {
    const config: MatDialogConfig = this.dialogConfig;
    // config.maxWidth = '31.25rem';
    config.panelClass = ['app-dialog'];
    config.data = data || {};

    this.dialogRef = this.dialog.open(CodeReviewDetailComponent, config);
    return this.dialogRef.afterClosed();
  }

  public close(): void {
    if (!this.dialogRef) {
      return;
    }

    this.dialogRef.close();
  }
}

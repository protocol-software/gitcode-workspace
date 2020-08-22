import { Direction } from '@angular/cdk/bidi';
import { Injectable } from '@angular/core';
import { DialogRole, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { PaymentDialogComponent } from './payment-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PaymentDialogService {
  private dialogRef: MatDialogRef<PaymentDialogComponent>;

  private dialogConfig = {
    autoFocus: false,
    // backdropClass: 'cdk-overlay-dark-backdrop',
    closeOnNavigation: false,
    direction: 'ltr' as Direction,
    disableClose: false,
    hasBackdrop: true,
    height: '80vh',
    // minHeight: '100vh',
    maxHeight: '100%',
    width: '776px',
    // minWidth: '23.5375rem',
    maxWidth: '776px',
    // position: <DialogPosition>'bottom',
    restoreFocus: false,
    role: 'dialog' as DialogRole,
  };

  constructor(private dialog: MatDialog) {
  }

  public open(data?: any): Observable<any> {
    const config: MatDialogConfig = this.dialogConfig;
    // config.maxWidth = '31.25rem';
    config.panelClass = ['app-dialog'];
    config.data = data || {};

    this.dialogRef = this.dialog.open(PaymentDialogComponent, config);
    return this.dialogRef.afterClosed();
  }

  public close(): void {
    if (!this.dialogRef) {
      return;
    }

    this.dialogRef.close();
  }
}

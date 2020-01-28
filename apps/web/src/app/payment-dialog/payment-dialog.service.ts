import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../config/app-config';
import { PaymentDialogComponent } from './payment-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PaymentDialogService {
  private dialogRef: MatDialogRef<PaymentDialogComponent>;

  constructor(private dialog: MatDialog) {
  }

  public open(data?: any): Observable<any> {
    const config: MatDialogConfig = AppConfig.dialog.config;
    config.maxWidth = '900px';
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

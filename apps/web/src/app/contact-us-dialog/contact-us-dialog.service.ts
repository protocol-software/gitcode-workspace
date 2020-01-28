import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../config/app-config';
import { ContactUsDialogComponent } from './contact-us-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ContactUsDialogService {
  private dialogRef: MatDialogRef<ContactUsDialogComponent>;

  constructor(private dialog: MatDialog) {
  }

  public open(data?: any): Observable<any> {
    const config: MatDialogConfig = AppConfig.dialog.config;
    config.maxWidth = AppConfig.breakpoints.small;
    config.panelClass = ['app-dialog'];
    config.data = data || {};

    this.dialogRef = this.dialog.open(ContactUsDialogComponent, config);
    return this.dialogRef.afterClosed();
  }

  public close(): void {
    if (!this.dialogRef) {
      return;
    }

    this.dialogRef.close();
  }
}

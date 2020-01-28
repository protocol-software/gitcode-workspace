import { Direction } from '@angular/cdk/bidi';
import { Injectable } from '@angular/core';
import { DialogRole, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
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

  public confirm(
    title: string,
    message: string,
    messageClass?: string,
    yesButtonText = 'OK',
    noButtonText = 'Cancel',
    dialogClass?: string,
    focusedButton?: 'yes' | 'no',
  ): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    const config: MatDialogConfig = {
      width: 'auto',
    };

    dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.messageClass = messageClass;
    dialogRef.componentInstance.yes = yesButtonText;
    dialogRef.componentInstance.cancel = noButtonText;
    dialogRef.componentInstance.dialogClass = dialogClass;
    dialogRef.componentInstance.focusedButton = focusedButton;

    return dialogRef.afterClosed();
  }

  public alert(title: string, message: string, okButtonText: string = 'OK'): Observable<boolean> {
    let dialogRef: MatDialogRef<AlertDialogComponent>;

    dialogRef = this.dialog.open(AlertDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.okButtonText = okButtonText;

    return dialogRef.afterClosed();
  }

  public info(
    title: string,
    message: string,
    shouldShowDefaultActions: boolean = true,
    okButtonText: string = 'OK',
  ): Observable<any> {
    const config: MatDialogConfig = this.dialogConfig;
    config.maxWidth = '31.25rem';
    // config.data = data || {};


    let dialogRef: MatDialogRef<InfoDialogComponent>;

    dialogRef = this.dialog.open(InfoDialogComponent, config);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.shouldShowDefaultActions = shouldShowDefaultActions;
    dialogRef.componentInstance.okButtonText = okButtonText;

    return dialogRef.afterClosed();
  }

  // public loadComponent<T>(dialogComponent: { new(): T }, dialogConfig: MatDialogConfig): Observable<any> {
  //   let dialogRef: MatDialogRef<T>;
  //
  //   dialogRef = this.dialog.open(this.createDialog<T>(dialogComponent), dialogConfig);
  //
  //   return dialogRef.afterClosed();
  // }
  //
  // private createDialog<T>(dialogComponent: { new(): T }): ComponentRef<T> {
  //   this.viewContainerRef.clear();
  //
  //   const dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
  //   return this.viewContainerRef.createComponent(dialogComponentFactory);
  // }
}

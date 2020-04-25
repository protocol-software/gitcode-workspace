import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialog.service';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  declarations: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
  ],
  providers: [
    DialogService,
  ],
  exports: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
  ],
})
export class DialogModule {
  static forRoot(): ModuleWithProviders<DialogModule> {
    return {
      ngModule: DialogModule,
      providers: [DialogService],
    };
  }
}

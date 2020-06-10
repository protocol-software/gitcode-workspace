import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PolicyDialogComponent } from './policy-dialog.component';
import { PolicyDialogService } from './policy-dialog.service';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  declarations: [PolicyDialogComponent],
  providers: [
    PolicyDialogService,
  ],
  exports: [PolicyDialogComponent],
  entryComponents: [PolicyDialogComponent],
})
export class PolicyDialogModule {}

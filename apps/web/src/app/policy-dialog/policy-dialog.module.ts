import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
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

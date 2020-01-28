import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { TermsDialogComponent } from './terms-dialog.component';
import { TermsDialogService } from './terms-dialog.service';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  declarations: [TermsDialogComponent],
  providers: [
    TermsDialogService,
  ],
  exports: [TermsDialogComponent],
  entryComponents: [TermsDialogComponent],
})
export class TermsDialogModule {}

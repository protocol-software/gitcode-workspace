import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
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

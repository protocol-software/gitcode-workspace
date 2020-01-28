import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PolicyDialogModule } from '../policy-dialog/policy-dialog.module';
import { TermsDialogModule } from '../terms-dialog/terms-dialog.module';
import { SignUpDialogComponent } from './sign-up-dialog.component';
import { SignUpDialogService } from './sign-up-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    TranslateModule,

    PolicyDialogModule,
    TermsDialogModule,
  ],
  declarations: [SignUpDialogComponent],
  providers: [
    SignUpDialogService,
  ],
  exports: [SignUpDialogComponent],
  entryComponents: [SignUpDialogComponent],
})
export class SignUpDialogModule {}

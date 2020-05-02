import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';
import { PolicyDialogModule } from '../policy-dialog/policy-dialog.module';
import { TermsDialogModule } from '../terms-dialog/terms-dialog.module';
import { SignUpDialogComponent } from './sign-up-dialog.component';
import { SignUpDialogService } from './sign-up-dialog.service';
import {OtpService} from '../../services/otp.service';
import {HttpService} from '../../services/http.service';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,

    PolicyDialogModule,
    TermsDialogModule,
  ],
  declarations: [SignUpDialogComponent],
  providers: [
    SignUpDialogService,
    OtpService,
    HttpService,
  ],
  exports: [SignUpDialogComponent],
  entryComponents: [SignUpDialogComponent],
})
export class SignUpDialogModule {

}

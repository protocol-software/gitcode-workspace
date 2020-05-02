import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PolicyDialogService } from '../policy-dialog/policy-dialog.service';
import { TermsDialogService } from '../terms-dialog/terms-dialog.service';
import {OtpService} from '../../services/otp.service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
})
export class SignUpDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'sign-up-dialog light-theme';

  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SignUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private termsDialogService: TermsDialogService,
    private policyDialogService: PolicyDialogService,
    private otpService: OtpService,
  ) {
    this.formGroup = this.formBuilder.group({
      isAgreed: [false, Validators.compose([Validators.requiredTrue])],
      email: ['', Validators.compose([Validators.requiredTrue])],
      otpCode: ['', Validators.compose([Validators.requiredTrue])],
    });
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }

  public displayTerms(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.termsDialogService.open();
  }

  public displayPolicy(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.policyDialogService.open();
  }

  public onFormSubmit(event, formValue): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.dialogRef.close(true);
  }

  public sendOtp(event): void {
    const data = {
      identity: this.formGroup.get('email').value,
      subject: 'Protocol 회원가입 이메일 인증코드',
      bodyHtml: `<div>
<div>아래 인증번호를 입력해 주세요.</div>
<div>OTPCODE</div>
<div>이 인증코드는 5분간 유효합니다.</div>
<div>수신 후 5분이 경과했다면 인증코드 재발송을 해 주세요.</div>
<div>Protocol All Right Reserved.</div>
</div>`,
    };

    this.otpService.sendOtpEmail(data).subscribe(result => {

    });
  }
  public verifyOtp(event): void {
    const data = {
      identity: this.formGroup.get('email').value,
      code: this.formGroup.get('otpCode').value,
    };

    this.otpService.verifyOtp(data).subscribe(result => {

    });
  }
}

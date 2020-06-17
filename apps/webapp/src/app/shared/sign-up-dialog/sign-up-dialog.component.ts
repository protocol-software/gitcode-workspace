import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PolicyDialogService } from '../policy-dialog/policy-dialog.service';
import { TermsDialogService } from '../terms-dialog/terms-dialog.service';
import {OtpService} from '../../services/otp.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
})
export class SignUpDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'sign-up-dialog light-theme';

  public formGroup: FormGroup;

  public isSignupComplete: Boolean = false;
  public isValidatedEmail: Boolean = false;
  public inputEmailErrMsg: String  = null;
  public inputCodeErrMsg: String   = null;
  
  public isEmailSending: Boolean    = false;
  public isOtpCodeValidComplete: Boolean = false;

  public timerTxt: String = null;
  private timer = null;

  public isAgreeUsePolicy: Boolean = false;
  public isAgreePersonPolicy: Boolean = false;

  public otpValidWaiting = 5;

  constructor(
    public dialogRef: MatDialogRef<SignUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private termsDialogService: TermsDialogService,
    private policyDialogService: PolicyDialogService,
    private otpService: OtpService,
    private authService: AuthService
  ) {
    this.formGroup = this.formBuilder.group({      
      email: ['', Validators.compose([Validators.required])],
      otpCode: ['', Validators.compose([Validators.required])],
    });
  }

  public ngOnInit() {    
    this.formGroup.patchValue({email: this.data.userCredential.user.email})
  }

  public ngOnDestroy() {
    this.clearTimer()
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
    this.formGroup.patchValue({'otpCode': ''})
    this.isOtpCodeValidComplete = false;
    this.inputEmailErrMsg = null;
    const inputEmail = this.formGroup.get('email').value;
    if(inputEmail == '') {
      this.inputEmailErrMsg = '이메일 주소를 입력해 주세요.';
      return;
    }

    const pattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if(!pattern.test(inputEmail)) {
      this.inputEmailErrMsg = '이메일 형식이 맞지 않습니다.';
      return;
    }

    const data = {
      identity: inputEmail,
      subject: 'Gitcode 회원가입 이메일 인증코드',
      bodyHtml: `<div>
<div>아래 인증번호를 입력해 주세요.</div>
<div>OTPCODE</div>
<div>이 인증코드는 5분간 유효합니다.</div>
<div>수신 후 5분이 경과했다면 인증코드 재발송을 해 주세요.</div>
<div>Gitcode All Right Reserved.</div>
</div>`,
    };
    this.isEmailSending = true;
    this.otpService.sendOtpEmail(data).subscribe(result => {      
      this.isEmailSending = false;
      if(result) {        
        this.startTimer();
      }else{
        this.inputEmailErrMsg = '인증메일 발송에 실패하였습니다.';
      }
    });
  }
  public verifyOtp(event): void {
    this.inputCodeErrMsg = null;
    const inputEmail = this.formGroup.get('email').value;
    const inputOtpCode = this.formGroup.get('otpCode').value;

    if(inputOtpCode == '') {
      this.inputCodeErrMsg = '인증코드를 입력해 주세요.';
      return;
    }    

    if(!this.timerTxt) {
      this.inputCodeErrMsg = '인증 유효시간이 초과되었습니다.'
      return;
    }
    
    const data = {
      identity: inputEmail,
      code: inputOtpCode
    };

    // result => true or false
    this.otpService.verifyOtp(data).subscribe(result => {
      if(result) {
        this.clearTimer()
        this.isValidatedEmail = true;
      }else{
        this.inputCodeErrMsg = '유효하지 않은 인증번호 입니다.';
      }
    });
  }

  public async signUpUserData (event): Promise<void> {
    const providerUserData = await this.authService.getProviderUserData(this.data.oauthProvider, this.data.userCredential);
    await this.authService.updateUserData(this.data.userCredential, this.data.oauthProvider, providerUserData);
    this.isSignupComplete = true;
  }

  public closePopup (event) {
    this.dialogRef.close(true);
  }

  private startTimer() : void {
    const limitDt = new Date();
    limitDt.setMinutes(limitDt.getMinutes() + this.otpValidWaiting);
    const countDownDate = limitDt.getTime();
    this.clearTimer();
    this.timer = setInterval(()=>{
      const now = new Date().getTime();
      const distance = countDownDate - now;
      if(distance <= 0) {
        this.clearTimer();
        return;
      }
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const min = (minutes < 10) ? `0${minutes}` : minutes;
      const sec = (seconds < 10) ? `0${seconds}` : seconds;
      this.timerTxt = `${min}:${sec}`;
    }, 1000);
  }

  private clearTimer () {
    clearInterval(this.timer);
    this.timer = null;
    this.timerTxt = null;
  }
}

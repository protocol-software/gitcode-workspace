import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DialogRole, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {OtpService} from "../../../../services/otp.service";
import {Direction} from "@angular/cdk/bidi";

@Component({
  selector: 'protocol-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  public dummyPayment = true; // TODO: delete dummy data
  public dummyRepository = true; // TODO: delete dummy data
  public dummySubscribe = true; // TODO: delete dummy data

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','symbol2','symbol3'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  private dialogConfig= {width:'384px'}
  private dialogConfigEmail ={
    autoFocus: false,
    // backdropClass: 'cdk-overlay-dark-backdrop',
    closeOnNavigation: true,
    direction: <Direction>'ltr',
    disableClose: false,
    hasBackdrop: true,
    height: '60vh',
    // minHeight: '100vh',
    maxHeight: '100%',
    width: '450px',
    // minWidth: '23.5375rem',
    maxWidth: '450px',
    panelClass: ['app-dialog'],
    // position: <DialogPosition>'bottom',
    restoreFocus: false,
    role: <DialogRole>'dialog',

  }
  constructor(public dialog : MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


  dialogChange(value) {
    if (value=='github'){
      const config: MatDialogConfig = this.dialogConfig;
      this.dialog.open(ConfirmDialogGithub, config);
    }
    else if(value=='name'){
      const config: MatDialogConfig = this.dialogConfig;
      this.dialog.open(ConfirmDialogName, config);
    }
    else if(value='email'){
      const config: MatDialogConfig = this.dialogConfigEmail;
      this.dialog.open(SettingsDialogEmail, config);
    }
  }
}

export interface PeriodicElement {
  position: string;
  name: string;
  weight: string;
  symbol: string;
  symbol2: string;
  symbol3: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: '2020-02-01', name: 'ON-DEMAND CODE-REVIEW', weight: '2020-05-01~2020-05-31', symbol: '신용카드 ****5678',symbol2: '1,000,000원',symbol3: '1,100,000원'},
  {position: '2020-02-01', name: 'ON-DEMAND CODE-REVIEW', weight: '2020-05-01~2020-05-31', symbol: '신용카드 ****5678',symbol2: '1,000,000원',symbol3: '1,100,000원'},
  {position: '2020-02-01', name: 'ON-DEMAND CODE-REVIEW', weight: '2020-05-01~2020-05-31', symbol: '신용카드 ****5678',symbol2: '1,000,000원',symbol3: '1,100,000원'},
  {position: '2020-02-01', name: 'ON-DEMAND CODE-REVIEW', weight: '2020-05-01~2020-05-31', symbol: '신용카드 ****5678',symbol2: '1,000,000원',symbol3: '1,100,000원'},
  {position: '2020-02-01', name: 'ON-DEMAND CODE-REVIEW', weight: '2020-05-01~2020-05-31', symbol: '신용카드 ****5678',symbol2: '1,000,000원',symbol3: '1,100,000원'},
  {position: '2020-02-01', name: 'ON-DEMAND CODE-REVIEW', weight: '2020-05-01~2020-05-31', symbol: '신용카드 ****5678',symbol2: '1,000,000원',symbol3: '1,100,000원'},
];



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'code-review-detail-dialog',
  template: '' +
      '<div class="flex justify-end">\n' +
      '    <button mat-dialog-close class="close-icon" tabindex="-1">\n' +
      '        <mat-icon>close</mat-icon>\n' +
      '    </button>\n' +
      '</div>\n' +
      '<div mat-dialog-content class="max-w-sm">\n' +
      '    <div class="max-w-sm">\n' +
      '        <div class="font-bold text-base text-charcoal  pb-3">변경 완료</div>\n' +
      '        <div>\n' +
      '            <div class="text-sm text-charcoal h-20">\n' +
      '                Github ID 변경되었습니다.<br>' +
      '            </div>\n' +
      '            <div class="text-blue text-sm flex justify-end">\n' +
      '                <div class="mr-3 cursor-pointer" (click)="confirmBox()">확인</div>\n' +
      '            </div>\n' +
      '        </div>\n' +
      '    </div>\n' +
      '</div>'
})
export class ConfirmDialogGithub {
  constructor(public dialog:MatDialog){}
  confirmBox(){ // it is working, IDE dones't check it exactly that is why this function color is gray.
    this.dialog.closeAll();
  };
}

@Component({
  selector: 'code-review-detail-dialog2',
  template: '' +
      '<div class="flex justify-end">\n' +
      '    <button mat-dialog-close class="close-icon" tabindex="-1">\n' +
      '        <mat-icon>close</mat-icon>\n' +
      '    </button>\n' +
      '</div>\n' +
      '<div mat-dialog-content class="max-w-sm">\n' +
      '    <div class="max-w-sm">\n' +
      '        <div class="font-bold text-base text-charcoal  pb-3">변경 완료</div>\n' +
      '        <div>\n' +
      '            <div class="text-sm text-charcoal h-20">\n' +
      '                사용자 이름이 변경되었습니다.<br>' +
      '            </div>\n' +
      '            <div class="text-blue text-sm flex justify-end">\n' +
      '                <div class="mr-3 cursor-pointer" (click)="confirmBox()">확인</div>\n' +
      '            </div>\n' +
      '        </div>\n' +
      '    </div>\n' +
      '</div>'
})
export class ConfirmDialogName {
  constructor(public dialog:MatDialog){}
  confirmBox(){ // it is working, IDE dones't check it exactly that is why this function color is gray.
    this.dialog.closeAll();
  };
}

@Component({
  selector: 'protocol-settings-dialog-email',
  templateUrl: './setting-dialog-email.html',
})
export class SettingsDialogEmail {
  public formGroup: FormGroup;
  public isEmailSending: Boolean = false;
  public otpService: OtpService;
  public inputEmailErrMsg: string = null;
  public otpValidWaiting: 5;
  public isValidatedEmail: Boolean = false;
  public inputCodeErrMsg: String = null;
  public isOtpCodeValidComplete: Boolean = false;

  public timerTxt: String = null;
  private timer = null;
  private dialogConfig = {width: '384px'};


  constructor(
      public dialogRef: MatDialogRef<SettingsDialogEmail>, public dialog: MatDialog,
  ) {
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
    if (inputEmail == '') {
      this.inputEmailErrMsg = '이메일 주소를 입력해 주세요.';
      return;
    }

    const pattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!pattern.test(inputEmail)) {
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
      if (result) {
        this.startTimer();
      } else {
        this.inputEmailErrMsg = '인증메일 발송에 실패하였습니다.';
      }
    });
  }

  private startTimer(): void {
    const limitDt = new Date();
    limitDt.setMinutes(limitDt.getMinutes() + this.otpValidWaiting);
    const countDownDate = limitDt.getTime();
    this.clearTimer();
    this.timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      if (distance <= 0) {
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

  private clearTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this.timerTxt = null;
  }

  public verifyOtp(event): void {
    this.inputCodeErrMsg = null;
    const inputEmail = this.formGroup.get('email').value;
    const inputOtpCode = this.formGroup.get('otpCode').value;

    if (inputOtpCode == '') {
      this.inputCodeErrMsg = '인증코드를 입력해 주세요.';
      return;
    }

    if (!this.timerTxt) {
      this.inputCodeErrMsg = '인증 유효시간이 초과되었습니다.'
      return;
    }

    const data = {
      identity: inputEmail,
      code: inputOtpCode
    };

    // result => true or false
    this.otpService.verifyOtp(data).subscribe(result => {
      if (result) {
        this.clearTimer()
        this.isValidatedEmail = true;
      } else {
        this.inputCodeErrMsg = '유효하지 않은 인증번호 입니다.';
      }
    });
  }

  dialogChange(value) {
    if (value == 'emailSave') {
      const config: MatDialogConfig = this.dialogConfig;
      this.dialog.open(EmailDialogSave, config);
    }
  }
}

@Component({
  selector: 'code-review-detail-dialog-email-save',
  template: '' +
      '<div class="flex justify-end">\n' +
      '    <button mat-dialog-close class="close-icon" tabindex="-1">\n' +
      '        <mat-icon>close</mat-icon>\n' +
      '    </button>\n' +
      '</div>\n' +
      '<div mat-dialog-content class="max-w-sm">\n' +
      '    <div class="max-w-sm">\n' +
      '        <div class="font-bold text-base text-charcoal  pb-3">변경 완료</div>\n' +
      '        <div>\n' +
      '            <div class="text-sm text-charcoal h-20">\n' +
      '                이메일 주소가 변경되었습니다.<br>' +
      '            </div>\n' +
      '            <div class="text-blue text-sm flex justify-end">\n' +
      '                <div class="mr-3 cursor-pointer" (click)="confirmBox()">확인</div>\n' +
      '            </div>\n' +
      '        </div>\n' +
      '    </div>\n' +
      '</div>'
})
export class EmailDialogSave {
  constructor(public dialog:MatDialog){}
  confirmBox(){ // it is working, IDE dones't check it exactly that is why this function color is gray.
    this.dialog.closeAll();
  };
}
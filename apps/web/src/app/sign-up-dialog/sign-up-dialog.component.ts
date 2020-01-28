import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PolicyDialogService } from '../policy-dialog/policy-dialog.service';
import { TermsDialogService } from '../terms-dialog/terms-dialog.service';

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
  ) {
    this.formGroup = this.formBuilder.group({
      isAgreed: [false, Validators.compose([Validators.requiredTrue])],
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
}

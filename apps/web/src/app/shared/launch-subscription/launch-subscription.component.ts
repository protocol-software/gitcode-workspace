import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ValidationPattern } from '@re-code-io/data';
import { DialogService, LaunchSubscriptionService } from '@re-code-io/ui';
import * as firebase from 'firebase';
import { from, ObservedValueOf, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-launch-subscription',
  templateUrl: './launch-subscription.component.html',
  styleUrls: ['./launch-subscription.component.scss'],
})
export class LaunchSubscriptionComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'launch-subscription light-theme';

  public formGroup: FormGroup;
  public emailControl: AbstractControl;
  public phoneControl: AbstractControl;
  public isCheckingSubscriber = false;

  private addSubscriberSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private launchSubscriptionService: LaunchSubscriptionService,
    private dialogService: DialogService,
  ) {
    this.formGroup = this.formBuilder.group({
      teamSize: [null, Validators.compose([Validators.required])],
      isForCodeQuality: [false],
      isForEducational: [false],
      purposes: [[], Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(ValidationPattern.email)])],
      phone: ['', Validators.compose([Validators.pattern(ValidationPattern.phone)])],
    });

    this.emailControl = this.formGroup.get('email');
    this.phoneControl = this.formGroup.get('phone');
    this.monitorFormValueChanges();
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {
    if (this.addSubscriberSubscription) {
      this.addSubscriberSubscription.unsubscribe();
      this.addSubscriberSubscription = null;
    }
  }

  public ngAfterViewInit(): void {}

  private monitorFormValueChanges(): void {
    this.monitorEmailChanges();
  }

  private monitorEmailChanges(): void {
    this.emailControl.valueChanges.pipe(
      distinctUntilChanged(),
      // debounceTime(500),
    ).subscribe(
      (value) => {
        // clear validation errors if the value is empty.
        if (!value) {
          this.emailControl.setErrors(null);
          return;
        }

        // return if email address format is invalid.
        if (!ValidationPattern.email.test(value)) {
          return;
        }

        // TODO: add spinner.
        this.isCheckingSubscriber = true;
        this.launchSubscriptionService.getSubscriber(value)
            .subscribe(
              (subscribers) => {
                if (subscribers && !!subscribers.length) {
                  this.emailControl.setErrors({ existed: true });
                }

                this.isCheckingSubscriber = false;
              },
            );
      },
    );
  }

  public onFormSubmit(event, formValue, formGroupDirective: FormGroupDirective) {
    event.preventDefault();
    event.stopPropagation();

    formValue.registerDate = new Date();
    const subscriber = formValue;
    delete subscriber.isForCodeQuality;
    delete subscriber.isForEducational;

    if (this.addSubscriberSubscription) {
      this.addSubscriberSubscription.unsubscribe();
      this.addSubscriberSubscription = null;
    }

    this.addSubscriberSubscription = from(this.launchSubscriptionService.addSubscriber(subscriber)).subscribe(
      res => this.handleAddSubscriberSuccess(res, formGroupDirective),
      err => this.handleAddSubscriberFailure(err),
    );
  }

  private handleAddSubscriberSuccess(
    res: ObservedValueOf<Promise<firebase.firestore.DocumentReference>>,
    formGroupDirective: FormGroupDirective,
  ) {
    formGroupDirective.resetForm();
    this.formGroup.reset();

    this.dialogService.alert('신청완료', '신청이 완료되었습니다.<br>감사합니다.');
  }

  private handleAddSubscriberFailure(err: any) {
    console.error(err);
  }

  public onPurposeSelectionChanged(tag: string, isChecked: boolean): void {
    const purposesControl = this.formGroup.get('purposes');
    let purposes = purposesControl.value as string[] || [];

    purposes = purposes.filter(purpose => purpose !== tag);

    if (isChecked) {
      purposes.push(tag);
    }

    purposesControl.setValue(purposes);
  }
}

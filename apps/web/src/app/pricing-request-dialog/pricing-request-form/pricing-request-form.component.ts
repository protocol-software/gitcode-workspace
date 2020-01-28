import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationPattern } from '@re-code-io/data';
import { FirebaseHelperService } from '@re-code-io/ui';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-pricing-request-form',
  templateUrl: './pricing-request-form.component.html',
  styleUrls: ['./pricing-request-form.component.scss'],
})
export class PricingRequestFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'pricing-request-form light-theme';

  @Output() public formSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  public formGroup: FormGroup;
  public teamSizes = [
    { value: '1~3', text: '1~3' },
    { value: '4~6', text: '4~6' },
    { value: '7~9', text: '7~9' },
    { value: '10~', text: '10~' },
  ];
  public isInProgress = false;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseHelperService: FirebaseHelperService,
  ) {
    this.formGroup = this.formBuilder.group({
      projectName: ['', Validators.compose([Validators.required])],
      companyName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(ValidationPattern.email)])],
      phone: ['', Validators.compose([Validators.required])],
      teamSize: ['', Validators.compose([Validators.required])],
      note: [''],
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public onFormSubmit(event, formValue) {
    event.preventDefault();
    event.stopPropagation();

    this.isInProgress = true;
    from(this.firebaseHelperService.addDocument('pricingRequest', formValue))
      .pipe(
        tap(
          () => {
            this.isInProgress = false;
          },
        ),
      )
      .subscribe(
        (result) => {
          this.formSubmitted.emit(true);
        },
      );
  }
}

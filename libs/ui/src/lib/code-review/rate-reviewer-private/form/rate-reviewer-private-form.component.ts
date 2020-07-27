import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRateReviewerPrivate } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewer-private-form',
  templateUrl: './rate-reviewer-private-form.component.html',
  styleUrls: ['./rate-reviewer-private-form.component.scss'],
})
export class RateReviewerPrivateFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'rate-reviewer-private-form';

  @Input() public rateReviewerPrivate: IRateReviewerPrivate;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      // TODO: add form elements.
      sampleInput: ['', Validators.compose([Validators.required])],
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onRateReviewerPrivateChanged(changes['rateReviewerPrivate']);
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  private onRateReviewerPrivateChanged(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    // TODO: fill form on rateReviewerPrivate changed.
    this.formGroup.patchValue({});
  }

  public onFormSubmit(event, formValue): void {
    event.preventDefault();
    event.stopPropagation();

    // TODO: call API with form value.
    console.log('form submit');
    this.formGroup.reset();
  }
}

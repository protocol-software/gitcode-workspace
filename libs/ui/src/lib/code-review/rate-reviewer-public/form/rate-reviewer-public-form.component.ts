import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRateReviewerPublic } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewer-public-form',
  templateUrl: './rate-reviewer-public-form.component.html',
  styleUrls: ['./rate-reviewer-public-form.component.scss'],
})
export class RateReviewerPublicFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'rate-reviewer-public-form';

  @Input() public rateReviewerPublic: IRateReviewerPublic;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      // TODO: add form elements.
      sampleInput: ['', Validators.compose([Validators.required])],
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onRateReviewerPublicChanged(changes['rateReviewerPublic']);
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  private onRateReviewerPublicChanged(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    // TODO: fill form on rateReviewerPublic changed.
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

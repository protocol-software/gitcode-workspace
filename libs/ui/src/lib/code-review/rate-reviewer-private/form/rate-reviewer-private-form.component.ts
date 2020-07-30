import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
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
  @Output() public formSubmitted: EventEmitter<IRateReviewerPrivate> = new EventEmitter<IRateReviewerPrivate>();

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      reviewSatisfactionScore: [0, Validators.compose([Validators.required])],
      reviewDetailScore: [0, Validators.compose([Validators.required])],
      reviewCompletenessScore: [0, Validators.compose([Validators.required])],
      comment: [''],
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

    const data: IRateReviewerPrivate = change.currentValue;
    this.formGroup.patchValue({
      reviewSatisfactionScore: data.reviewSatisfactionScore,
      reviewDetailScore: data.reviewDetailScore,
      reviewCompletenessScore: data.reviewCompletenessScore,
      comment: data.comment,
    });
  }

  public onFormSubmit(event, formValue): void {
    event.preventDefault();
    event.stopPropagation();

    // TODO: call API with form value.
    this.formSubmitted.emit(formValue);
    this.formGroup.reset();
  }
}

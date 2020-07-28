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
import { IRateReviewerPublic } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewer-public-form',
  templateUrl: './rate-reviewer-public-form.component.html',
  styleUrls: ['./rate-reviewer-public-form.component.scss'],
})
export class RateReviewerPublicFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'rate-reviewer-public-form';

  @Input() public rateReviewerPublic: IRateReviewerPublic;
  @Output() public formSubmitted: EventEmitter<IRateReviewerPublic> = new EventEmitter<IRateReviewerPublic>();

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      reviewSatisfactionScore: [0, Validators.compose([Validators.required])],
      reviewDetailScore: [0, Validators.compose([Validators.required])],
      comment: [''],
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

    const data: IRateReviewerPublic = change.currentValue;
    this.formGroup.patchValue({
      reviewSatisfactionScore: data.reviewSatisfactionScore,
      reviewDetailScore: data.reviewDetailScore,
      comment: data.comment,
    });
  }

  public onFormSubmit(event, formValue): void {
    event.preventDefault();
    event.stopPropagation();

    // TODO: call API with form value.
    console.log('form submit');
    this.formSubmitted.emit(formValue);
    this.formGroup.reset();
  }
}

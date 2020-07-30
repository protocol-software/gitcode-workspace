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
import { IRateReviewee } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewee-form',
  templateUrl: './rate-reviewee-form.component.html',
  styleUrls: ['./rate-reviewee-form.component.scss'],
})
export class RateRevieweeFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'rate-reviewee-form';

  @Input() public rateReviewee: IRateReviewee;
  @Output() public formSubmitted: EventEmitter<IRateReviewee> = new EventEmitter<IRateReviewee>();

  public formGroup: FormGroup;
  public username: string;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      readabilityScore: [0, Validators.compose([Validators.required])],
      knowledgeScore: [0, Validators.compose([Validators.required])],
      understandingScore: [0, Validators.compose([Validators.required])],
      comment: [0, Validators.compose([Validators.required])],
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onRateRevieweeChanged(changes['rateReviewee']);
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  private onRateRevieweeChanged(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    const data: IRateReviewee = change.currentValue;
    this.formGroup.patchValue({
      readabilityScore: data.readabilityScore,
      knowledgeScore: data.knowledgeScore,
      understandingScore: data.understandingScore,
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

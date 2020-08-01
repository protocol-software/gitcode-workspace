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
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICodeReviewBestAnswer, IRateReviewerPrivate } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewer-private-form',
  templateUrl: './rate-reviewer-private-form.component.html',
  styleUrls: ['./rate-reviewer-private-form.component.scss'],
})
export class RateReviewerPrivateFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'rate-reviewer-private-form';

  @Input() public bestAnswer: ICodeReviewBestAnswer;
  @Input() public rateReviewerPrivate: IRateReviewerPrivate;
  @Output() public formSubmitted: EventEmitter<IRateReviewerPrivate> = new EventEmitter<IRateReviewerPrivate>();

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private angularFirestore: AngularFirestore,
  ) {
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

  public async onFormSubmit(event, formValue): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const data = {
      bestAnswer: this.bestAnswer,
      createdDate: (new Date()).toISOString(),
    };
    Object.assign(data, formValue);
    await this.angularFirestore.collection('rate-reviewer-private').add(data);
    this.formSubmitted.emit(formValue);
    this.formGroup.reset();
  }
}

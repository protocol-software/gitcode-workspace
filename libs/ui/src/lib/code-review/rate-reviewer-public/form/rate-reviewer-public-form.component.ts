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
import { ICodeReviewBestAnswer, IRateReviewerPublic } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewer-public-form',
  templateUrl: './rate-reviewer-public-form.component.html',
  styleUrls: ['./rate-reviewer-public-form.component.scss'],
})
export class RateReviewerPublicFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'rate-reviewer-public-form';

  @Input() public bestAnswer: ICodeReviewBestAnswer;
  @Input() public rateReviewerPublic: IRateReviewerPublic;
  @Output() public formSubmitted: EventEmitter<IRateReviewerPublic> = new EventEmitter<IRateReviewerPublic>();

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private angularFirestore: AngularFirestore,
  ) {
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

  public async onFormSubmit(event, formValue): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const data = {
      bestAnswer: this.bestAnswer,
      createdDate: (new Date()).toISOString(),
    };
    Object.assign(data, formValue);
    await this.angularFirestore.collection('rate-reviewer-public').add(data);
    this.formSubmitted.emit(formValue);
    this.formGroup.reset();
  }
}

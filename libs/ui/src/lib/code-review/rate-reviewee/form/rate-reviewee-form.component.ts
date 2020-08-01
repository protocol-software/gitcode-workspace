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
import { ICodeReviewBestAnswer, IRateReviewee } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewee-form',
  templateUrl: './rate-reviewee-form.component.html',
  styleUrls: ['./rate-reviewee-form.component.scss'],
})
export class RateRevieweeFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'rate-reviewee-form';

  @Input() public bestAnswer: ICodeReviewBestAnswer;
  @Input() public rateReviewee: IRateReviewee;
  @Output() public formSubmitted: EventEmitter<IRateReviewee> = new EventEmitter<IRateReviewee>();

  public formGroup: FormGroup;
  public username: string;

  constructor(private formBuilder: FormBuilder,
              private angularFirestore: AngularFirestore,
  ) {
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

  public async onFormSubmit(event, formValue): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const data = {
      bestAnswer: this.bestAnswer,
      createdDate: (new Date()).toISOString(),
    };
    Object.assign(data, formValue);
    await this.angularFirestore.collection('rate-reviewee').add(data);
    this.formSubmitted.emit(formValue);
    this.formGroup.reset();
  }
}

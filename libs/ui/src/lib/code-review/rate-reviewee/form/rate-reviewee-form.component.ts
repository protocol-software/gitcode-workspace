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
import { IRateReviewee } from '@gitcode/data';

@Component({
  selector: 'gitcode-rate-reviewee-form',
  templateUrl: './rate-reviewee-form.component.html',
  styleUrls: ['./rate-reviewee-form.component.scss'],
})
export class RateRevieweeFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'rate-reviewee-form';

  @Input() public rateReviewee: IRateReviewee;

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      // TODO: add form elements.
      sampleInput: ['', Validators.compose([Validators.required])],
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

    // TODO: fill form on rateReviewee changed.
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

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
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { ContactUsService } from '@re-code-io/ui';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
})
export class ContactUsFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'contact-us-form light-theme';

  @Output() public formSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  public formGroup: FormGroup;
  public isWireframeTopicFormControl = new FormControl();
  public isDesignTopicFormControl = new FormControl();
  public isDevelopmentTopicFormControl = new FormControl();
  public isOthersTopicFormControl = new FormControl();
  public topics = [
    'UI/UX Wireframe',
    'Design',
    'Development',
    'Others',
  ];
  public isAtLeastOneTopic: boolean;
  public isFormSubmitting = false;

  public topicsFormArray = new FormArray([
    this.isWireframeTopicFormControl,
    this.isDesignTopicFormControl,
    this.isDevelopmentTopicFormControl,
    this.isOthersTopicFormControl,
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private contactUsService: ContactUsService,
  ) {
    this.formGroup = this.formBuilder.group({
      projectName: ['', Validators.compose([Validators.required])],
      companyName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      topics: this.topicsFormArray,
      detail: [''],
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public onFormSubmit(event, formValue) {
    event.preventDefault();
    event.stopPropagation();

    formValue.topics = formValue.topics
                                .map((isChecked, index) => isChecked ? this.topics[index] : null)
                                .filter(item => !!item);
    const data = Object.assign({}, formValue);
    data.createdAt = new Date();

    this.isFormSubmitting = true;
    this.contactUsService.addContactUs(data).subscribe(
      (result) => {
        this.isFormSubmitting = false;
        this.formSubmitted.emit(true);
      },
    );
  }

  public onTopicSelectionChanged(event: MatCheckboxChange): void {
    this.isAtLeastOneTopic = this.topicsFormArray.value.reduce((result, item) => result || item, false);
  }
}

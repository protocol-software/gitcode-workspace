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
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'gitcode-code-review-filter',
  templateUrl: './code-review-filter.component.html',
  styleUrls: ['./code-review-filter.component.scss'],
})
export class CodeReviewFilterComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'code-review-filter';

  @Output() public formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  public formGroup: FormGroup;

  public availableFrameworks: string[] = [];
  public availableLanguages: string[] = [];
  public availableDatabases: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      frameworks: [[]],
      languages: [[]],
      databases: [[]],
      isOnlyMyPRs: [false],
    });

    this.availableFrameworks = [
      'Angular 2+',
      'Angular 8+',
      'Angular 9',
      'Angular',
      'AngularJS',
      'Backbone',
      'Django',
      'Ember',
      'Express',
      'Laravel',
      'Rails',
      'React',
      'React',
      'Spring',
      'Vue',
    ];

    this.availableLanguages = [
      'JavaScript',
      'TypeScript',
    ];

    this.availableDatabases = [
      'SQL Server',
      'MySQL',
      'MongoDB',
    ];
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public onFormSubmit(event, formValue): void {
    event.preventDefault();
    event.stopPropagation();

    this.formSubmitted.emit(formValue);
  }
}

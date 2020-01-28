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
import { IPullRequestFilter } from './pull-request-filter.interface';

@Component({
  selector: 'app-pull-request-filter',
  templateUrl: './pull-request-filter.component.html',
  styleUrls: ['./pull-request-filter.component.scss'],
})
export class PullRequestFilterComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'pull-request-filter light-theme';

  @Output() public filterChanged: EventEmitter<IPullRequestFilter> = new EventEmitter<IPullRequestFilter>();

  public pullRequestStatuses = [
    'Open',
    'Closed',
    'Reopen',
  ];

  public pullRequestLanguages = [
    'C#',
    'JavaScript',
  ];

  public pullRequestFrameworks = [
    'Angular',
    'Node',
    'React',
  ];

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      isOnlySelfPR: [false],
      status: ['All'],
      language: ['All'],
      framework: ['All'],
      keyword: [''],
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public onFormSubmit(event, formValue) {
    event.preventDefault();
    event.stopPropagation();

    const filter: IPullRequestFilter = {
      isOnlySelfPR: formValue.isOnlySelfPR,
    };

    if (formValue.status !== 'All') {
      filter.status = formValue.status;
    }

    if (formValue.language !== 'All') {
      filter.language = formValue.language;
    }

    if (formValue.framework !== 'All') {
      filter.framework = formValue.framework;
    }

    if (formValue.keyword.trim() !== '') {
      filter.keyword = formValue.keyword.trim();
    }

    this.filterChanged.emit(filter);
  }
}

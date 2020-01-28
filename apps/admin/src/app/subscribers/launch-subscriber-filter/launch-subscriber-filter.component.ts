import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding, Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ILaunchSubscriberFilter } from '../interfaces/launch-subscriber-filter.interface';

@Component({
  selector: 'app-launch-subscriber-filter',
  templateUrl: './launch-subscriber-filter.component.html',
  styleUrls: ['./launch-subscriber-filter.component.scss'],
})
export class LaunchSubscriberFilterComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'launch-subscriber-filter';

  @Input() public shouldResetFilter: boolean;
  @Output() public filterChanged: EventEmitter<ILaunchSubscriberFilter> = new EventEmitter<ILaunchSubscriberFilter>();
  @Output() public deleteRequested: EventEmitter<boolean> = new EventEmitter<boolean>();

  public teamSizes = new FormControl();
  public teamSizeList: { value: string, text: string }[] = [
    { value: 'individual', text: 'Individual' },
    { value: 'small', text: 'Small' },
    { value: 'medium', text: 'Medium' },
    // { value: 'large', text: 'Large' },
  ];

  public purposes = new FormControl();
  public purposeList: { value: string, text: string }[] = [
    { value: 'educational', text: 'Educational' },
    { value: 'code quality', text: 'Code Quality' },
  ];

  public keyword = new FormControl();

  constructor() {}

  public ngOnInit(): void {
    this.teamSizes.patchValue(this.teamSizeList.map(item => item.value));

    this.teamSizes.valueChanges.subscribe(this.emitFilter.bind(this));
    this.purposes.valueChanges.subscribe(this.emitFilter.bind(this));
    this.keyword.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
    ).subscribe(this.emitFilter.bind(this));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.onShouldResetFormChanges(changes['shouldResetFilter']);
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  private onShouldResetFormChanges(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    this.teamSizes.patchValue(this.teamSizeList.map(item => item.value));
    this.purposes.patchValue([]);
    this.keyword.patchValue('');
  }

  public requestDelete(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.deleteRequested.emit(true);
  }

  private emitFilter(): void {
    const filter: ILaunchSubscriberFilter = {
      teamSizes: this.teamSizes.value,
      purposes: this.purposes.value,
      keyword: this.keyword.value,
    };

    this.filterChanged.emit(filter);
  }
}

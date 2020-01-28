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

@Component({
  selector: 'app-mystique-page-filter',
  templateUrl: './mystique-page-filter.component.html',
  styleUrls: ['./mystique-page-filter.component.scss'],
})
export class MystiquePageFilterComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'mystique-page-filter';


  private _dataList: any[];
  get dataList(): any[] {
    return this._dataList;
  }
  @Input()
  set dataList(value: any[]) {
    this._dataList = value;
    this.setFilterItems();
  }

  @Input() public filterSource: any[];
  @Input() public shouldResetFilter: boolean;
  @Output() public filterChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() public deleteRequested: EventEmitter<boolean> = new EventEmitter<boolean>();

  // public teamSizes = new FormControl();
  // public teamSizeList: { value: string, text: string }[] = [
  //   { value: 'individual', text: 'Individual' },
  //   { value: 'small', text: 'Small' },
  //   { value: 'medium', text: 'Medium' },
  //   // { value: 'large', text: 'Large' },
  // ];

  // public purposes = new FormControl();
  // public purposeList: { value: string, text: string }[] = [
  //   { value: 'educational', text: 'Educational' },
  //   { value: 'code quality', text: 'Code Quality' },
  // ];

  public filterItems: any = {};
  public filterKeys: string[] = [];
  public filterLabel: string[] = [];

  constructor() {}

  public ngOnInit(): void {
    // this.teamSizes.patchValue(this.teamSizeList.map(item => item.value));

    // this.teamSizes.valueChanges.subscribe(this.emitFilter.bind(this));
    // this.purposes.valueChanges.subscribe(this.emitFilter.bind(this));
    // this.keyword.valueChanges.pipe(
    //   distinctUntilChanged(),
    //   debounceTime(300),
    // ).subscribe(this.emitFilter.bind(this));
  }
  private setFilterItems(): void {
    if(!this._dataList || this.filterKeys.length > 0) {
      return;
    }

    const filterFields = this.filterSource.map(filter => filter['field']);

    this._dataList.forEach(data => {
      filterFields.forEach((filterField, index) => {
        const value = data[filterField];
        if(!value) return;

        if(!this.filterItems[filterField]) {
          this.filterItems[filterField] = { form: new FormControl(), list: []};
          this.filterItems[filterField].form.valueChanges.subscribe(this.emitFilter.bind(this));
        }

        const values = this.filterItems[filterField]['list'].map(item => item['value']);
        if(!values.includes(value)) {
          this.filterItems[filterField]['list'].push({ value: value, text: value });

          if(!this.filterKeys.includes(filterField)) {
            this.filterKeys.push(filterField);
            this.filterLabel.push(this.filterSource[index]['label']);
          }
        }

      })
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public doFilter(): void {
    this.emitFilter();
  }

  public requestDelete(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.deleteRequested.emit(true);
  }

  private emitFilter(): void {
    const filter: any = {};

    this.filterKeys.forEach(filterKey => {
      if(!this.filterItems[filterKey].form.value || this.filterItems[filterKey].form.value.length === 0) return;

      filter[filterKey] = this.filterItems[filterKey].form.value;
    });

    this.filterChanged.emit(filter);
  }
}

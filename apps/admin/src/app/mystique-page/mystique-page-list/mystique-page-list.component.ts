import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { IPagination } from '@re-code-io/data';
import * as _ from 'lodash';

@Component({
  selector: 'app-mystique-page-list',
  templateUrl: './mystique-page-list.component.html',
  styleUrls: ['./mystique-page-list.component.scss'],
})
export class MystiquePageListComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'mystique-page-list';

  @Input() public listSource: any[];
  @Input() public dataList: any[] = [];
  @Input() public pagination: IPagination;

  @Output() public dataSelected: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() public pageChanged: EventEmitter<number> = new EventEmitter<number>();

  private letterSize = 9.5;
  private maxCellWidth = 200;

  constructor() {
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onDataChanges(changes['dataList']);
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}


  public getFullWidth(): number {
    let width = 0;

    if(this.dataList && this.dataList.length > 0) {
      const keys = Object.keys(this.dataList[0]);
      let allText = '';
      keys.forEach(key => {
        allText += this.dataList[0][key];
      });
      width = allText.length * this.letterSize;
      width = (width > keys.length*this.maxCellWidth) ? keys.length*this.maxCellWidth : width;
    }

    return width;
  }
  public getWidth(text: string): number {
    let width = 0;

    if (!text) text = '';
    width = text.length * this.letterSize;
    width = (width > this.maxCellWidth) ? this.maxCellWidth : width;

    return width;
  }

  private onDataChanges(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    this.dataList = _.orderBy(change.currentValue, []);
    this.pagination.totalItems = this.dataList.length;
  }

  public selectAllData(event): void {
    this.dataList = this.dataList.map(
      (data) => {
        data.isSelected = event.checked;
        return data;
      });

    this.emitSelectedData();
  }

  public selectData(event, data: any): void {
    data.isSelected = event.checked;
    this.emitSelectedData();
  }

  private emitSelectedData(): void {
    const selectedDatas = this.dataList.filter(data => data.isSelected);
    this.dataSelected.emit(selectedDatas);
  }

  public onPageChanged(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }
}

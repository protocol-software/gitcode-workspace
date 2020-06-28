import {Component, HostListener, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'gitcode-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  maxSizeNumber: number = 9; // pc
  private isScreenSmall: boolean;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  isUnchanged: any;

  constructor() { }

  ngOnInit() {
    this.detectScreenSize();
  }
  private detectScreenSize() {
    if (this.isScreenSmall = window.innerWidth < 959){
      return this.maxSizeNumber = 5;
    }
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.detectScreenSize();
  }

}

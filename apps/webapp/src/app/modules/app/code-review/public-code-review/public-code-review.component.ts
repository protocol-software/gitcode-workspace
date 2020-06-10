import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestCodeReviewService} from './request-code-review/request-code-review.service';
import {CodeReviewDetailService} from "./code-review-detail/code-review-detail.service";
import {IStatusList, IPublicCodeReviewList, PublicCodeReviewService} from "../../../../services/public-code-review.service";
import {FormControl} from "@angular/forms";
import { Pipe, PipeTransform } from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'protocol-public-code-review',
  templateUrl: './public-code-review.component.html',
  styleUrls: ['./public-code-review.component.scss']
})
export class PublicCodeReviewComponent implements OnInit {
  contentList : IPublicCodeReviewList[] = [];
  contentListLength : any = [];
  itemsPerPage = 5;
  currentPage;
  totalItems;
  public errorMsg;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato','Tomato','Tomato','Tomato','Tomato','Tomato','Tomato','Tomato','Tomato'];
  frameworks = new FormControl();
  frameworksList: string[] = ['Angular','AngularJS','Angular 2+','Angular 8+','Angular 9','Laravel','Express','Django','Rails','Spring','React','React','Vue','Ember','Backbone'];
  listStatuses = new FormControl();
  data: Object;


  // answer: Answer[];
  // this.answer = new Array<Answer>();
  isSelectedMyPost: boolean = false;
  isSelectedStatus: string ;
  isSelectedMyPost2 :any =[];
  contentStatusList: IStatusList[] = [];
  peopleFilter: [];



  constructor(
      private requestCodeReviewService: RequestCodeReviewService,
      private codeReviewDeatilService: CodeReviewDetailService,
      private publicCodeReviewService: PublicCodeReviewService,

  ) {

  }

  ngOnInit() {
    this.publicCodeReviewList();
    this.statusesList();
    this.fetch(1);

  }


  private publicCodeReviewList(){
    this.publicCodeReviewService.getPublicCodeReviewList()
        .subscribe(data => this.contentList= data,
            error => this.errorMsg = error);{
    }
  }

  private statusesList(){
    this.publicCodeReviewService.getStatusList()
        .subscribe(data => this.contentStatusList= data,
            error => this.errorMsg = error);{
    }
  }


  private fetch(pageNo): void {
    this.currentPage = pageNo;
    this.contentListLength = this.contentListLength.slice(this.itemsPerPage * (this.currentPage-1), this.itemsPerPage * this.currentPage);
    this.totalItems = this.contentListLength.length;
  }

  public pageChange(pageNo): void {
    this.fetch(pageNo);
  }

  createReview(event: MouseEvent): void {

    if (event) {
      event.preventDefault();
      event.stopPropagation();

    }

    const dialogClosed = this.requestCodeReviewService.open();
    dialogClosed.subscribe(
        (result) => {
          if (!result) {
            return;
          }
        },
    );
  }
  createReviewDetail(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();

    }

    const dialogClosed = this.codeReviewDeatilService.open();
    dialogClosed.subscribe(
        (result) => {
          if (!result) {
            return;
          }
        },
    );
  }

  filterItemOfType(postId:number) {
    return this.contentList.filter(data=> data.postId == postId);
  }

  getCheckboxes() {
    console.log(this.isSelectedStatus);
    return this.isSelectedStatus;
  }
}

@Pipe({ name: 'frameworks' })
export class SelectFrameworksPipe implements PipeTransform {
  transform(frameworks: IPublicCodeReviewList[]) {
    return frameworks.filter(frameworks => frameworks.tags == ["Angular"]);
  }
}



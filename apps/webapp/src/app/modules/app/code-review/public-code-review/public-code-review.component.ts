import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RequestCodeReviewService} from './request-code-review/request-code-review.service';
import {CodeReviewDetailService} from "./code-review-detail/code-review-detail.service";
import {IPublicCodeReviewList, PublicCodeReviewService} from "../../../../services/public-code-review.service";

@Component({
  selector: 'protocol-public-code-review',
  templateUrl: './public-code-review.component.html',
  styleUrls: ['./public-code-review.component.scss']
})
export class PublicCodeReviewComponent implements OnInit {
  contentList : IPublicCodeReviewList[] = [];

  serverContentList : any = [];
  itemsPerPage = 5;
  currentPage;
  totalItems;
  public errorMsg;

  constructor(
      private requestCodeReviewService: RequestCodeReviewService,
      private codeReviewDeatilService: CodeReviewDetailService,
      private publicCodeReviewService: PublicCodeReviewService,

  ) {

  }

  ngOnInit() {
    this.fetch(1);
    this.publicCodeReviewList();
  }

  private publicCodeReviewList(){
    this.publicCodeReviewService.getPublicCodeReviewList()
        .subscribe(data => this.contentList= data,
            error => this.errorMsg = error);{
              console.log(this.contentList);
    }
  }

  private fetch(pageNo): void {
    this.currentPage = pageNo;
    this.contentList = this.serverContentList.slice(this.itemsPerPage * (this.currentPage-1), this.itemsPerPage * this.currentPage);
    this.totalItems = this.serverContentList.length;
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
}


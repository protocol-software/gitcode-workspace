import { Component, OnInit } from '@angular/core';
import {RequestCodeReviewService} from './request-code-review/request-code-review.service';
import {CodeReviewDetailService} from "./code-review-detail/code-review-detail.service";
import {
  CodeReviewDetailComponent,
  CodeReviewDetailDialogBestreview
} from "./code-review-detail/code-review-detail.component";



@Component({
  selector: 'protocol-public-code-review',
  templateUrl: './public-code-review.component.html',
  styleUrls: ['./public-code-review.component.scss']
})
export class PublicCodeReviewComponent implements OnInit {
  // private test:  CodeReviewDetailDialogBestreview;
  // private test2: CodeReviewDetailComponent;
  constructor(
      private requestCodeReviewService: RequestCodeReviewService,
      private codeReviewDeatilService: CodeReviewDetailService,
  ) { }
  public dummyData = [
    {"id":1,"itemsName":"how it works 1","status":"open",}
  ];

  ngOnInit() {

    //for development
    // this.test2.openDialogBestreview(null);
    // this.test.confirmBox();


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


}

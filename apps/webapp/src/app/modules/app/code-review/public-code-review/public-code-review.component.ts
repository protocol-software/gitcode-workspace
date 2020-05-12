import { Component, OnInit } from '@angular/core';
import {RequestCodeReviewService} from './request-code-review/request-code-review.service';

@Component({
  selector: 'protocol-public-code-review',
  templateUrl: './public-code-review.component.html',
  styleUrls: ['./public-code-review.component.scss']
})
export class PublicCodeReviewComponent implements OnInit {

  constructor(
      private requestCodeReviewService: RequestCodeReviewService
  ) { }

  ngOnInit(): void {
    this.createReview(null); //for development
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

}

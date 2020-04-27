import { Component, OnInit } from '@angular/core';
import {RequestCodeReviewService} from './request-code-review/request-code-review.service';

@Component({
  selector: 'protocol-private-code-review',
  templateUrl: './private-code-review.component.html',
  styleUrls: ['./private-code-review.component.scss']
})
export class PrivateCodeReviewComponent implements OnInit {

  constructor(
      private requestCodeReviewService: RequestCodeReviewService
  ) { }

  ngOnInit(): void {
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

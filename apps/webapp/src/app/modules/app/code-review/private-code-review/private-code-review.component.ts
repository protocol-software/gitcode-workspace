import { Component, OnInit } from '@angular/core';
import {RequestCodeReviewService} from './request-code-review/request-code-review.service';
import {CodeReviewDetailService} from "./code-review-detail/code-review-detail.service";
import {PaymentDialogService} from '../../../../shared/payment-dialog/payment-dialog.service'

@Component({
  selector: 'gitcode-private-code-review',
  templateUrl: './private-code-review.component.html',
  styleUrls: ['./private-code-review.component.scss']
})
export class PrivateCodeReviewComponent implements OnInit {


  constructor(
      private requestCodeReviewService: RequestCodeReviewService,
      private codeReviewDeatilService: CodeReviewDetailService,
      private paymentDialogService: PaymentDialogService,
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

  createReviewDetail(event: MouseEvent) {
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

    createDialogPayment() {
        this.paymentDialogService.open();
    }
}

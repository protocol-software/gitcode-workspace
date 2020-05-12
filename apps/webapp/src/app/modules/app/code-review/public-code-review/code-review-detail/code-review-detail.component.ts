import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'protocol-code-review-detail',
  templateUrl: './code-review-detail.component.html',
  styleUrls: ['./code-review-detail.component.scss']
})
export class CodeReviewDetailComponent implements OnInit {
  isReviewRequestComplete: any;

  constructor() { }

  ngOnInit(): void {
  }

  closePopup($event: MouseEvent) {
    
  }
}

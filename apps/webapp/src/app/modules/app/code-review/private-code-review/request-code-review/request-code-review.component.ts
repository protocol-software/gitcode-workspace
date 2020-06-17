import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gitcode-request-code-review',
  templateUrl: './request-code-review.component.html',
  styleUrls: ['./request-code-review.component.scss']
})
export class RequestCodeReviewComponent implements OnInit {
  public isReviewRequestComplete: Boolean = false;

  constructor(
      public dialogRef: MatDialogRef<RequestCodeReviewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }
  public async createReviewStep2(event: MouseEvent) {
    if (event) {
      // event.preventDefault();
      // event.stopPropagation();
      this.isReviewRequestComplete = true
    }
  }

  public closePopup(event) {
    this.dialogRef.close(true);
  }
}

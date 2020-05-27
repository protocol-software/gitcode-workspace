import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'protocol-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  constructor(
      public dialogRef: MatDialogRef<PaymentComponent>,
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.dialogRef.close(true);
  }
}

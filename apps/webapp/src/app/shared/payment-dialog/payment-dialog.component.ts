import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-policy-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
})
export class PaymentDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'policy-dialog secondary';
  foods: Food[] = [
    {value: 'payment12', viewValue: '12개월'},
    {value: 'payment11', viewValue: '11개월'},
    {value: 'payment10', viewValue: '10개월'},
    {value: 'tacos-2', viewValue: '9개월'},
    {value: 'tacos-2', viewValue: '7개월'},
    {value: 'tacos-2', viewValue: '6개월'},
    {value: 'tacos-2', viewValue: '5개월'},
    {value: 'tacos-2', viewValue: '4개월'},
    {value: 'tacos-2', viewValue: '3개월'},
    {value: 'tacos-2', viewValue: '2개월'},
    {value: 'tacos-2', viewValue: '1개월'},
  ];
    isComplete: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}

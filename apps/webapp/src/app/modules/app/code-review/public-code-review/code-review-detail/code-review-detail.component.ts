import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'protocol-code-review-detail',
  templateUrl: './code-review-detail.component.html',
  styleUrls: ['./code-review-detail.component.scss']
})
export class CodeReviewDetailComponent implements OnInit {
  isReviewRequestComplete: any;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  closePopup($event: MouseEvent) {
    
  }

    openDialog($value):void {
      if ($value==1){
        const dialogRef = this.dialog.open(CodeReviewDetailDialog,{
          data: {name: this.name, animal: this.animal}
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
        });
      }
      if ($value==2){
        const dialogRef = this.dialog.open(CodeReviewDetailDialog,{
          data: {name: this.name, animal: this.animal}
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
        });
      }
    }
}

@Component({
  selector: 'code-review-detail-dialog',
  templateUrl: 'code-review-detail-dialog.html',
})
export class CodeReviewDetailDialog {
  isTrue: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<CodeReviewDetailDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmBox(event: MouseEvent) {
    if (event) {
      this.isTrue = true;
    }
  }
  public closePopup(event) {
    this.dialogRef.close(true);
  }
}

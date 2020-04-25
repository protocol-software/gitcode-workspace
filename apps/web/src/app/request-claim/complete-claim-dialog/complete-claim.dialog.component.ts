import { Component } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: "complete-claim-dialog",
  templateUrl: "./complete-claim.dialog.component.html",
  styleUrls: ["./complete-claim.dialog.component.scss"]
})
export class CompleteClaimDialogComponent {

  
  constructor(public dialogRef: MatDialogRef<CompleteClaimDialogComponent>) {
  }
  closeDialog(){
  this.dialogRef.close();
  }
}

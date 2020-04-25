import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'request-claim-dialog',
  templateUrl: './request-claim.dialog.component.html',
  styleUrls:['./request-claim.dialog.component.scss']
})
export class RequestClaimDialogComponent  {
constructor(public dialogRef: MatDialogRef<RequestClaimDialogComponent>) {
 
}

close(){
  this.dialogRef.close();
}

save(){
// Form submission event will get called here
  this.dialogRef.close();
}
}

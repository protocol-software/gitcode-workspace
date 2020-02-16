import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {RequestClaimDialogComponent } from './request-claim-dialog/request-claim.dialog.component';
import { CompleteClaimDialogComponent } from './complete-claim-dialog/complete-claim.dialog.component';

@Component({
  selector: 'request-claim',
  templateUrl: 'request-claim.component.html',
  styleUrls:['request-claim.component.scss']
})
export class RequestClaimComponent  {

   constructor(private dialog: MatDialog) {
   }

    openDialog(component) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open(component, dialogConfig);
    }

    openRequestClaim(){
      this.openDialog(RequestClaimDialogComponent);
    }
    openCompleteClaim(){
      this.openDialog(CompleteClaimDialogComponent);
    }

 }



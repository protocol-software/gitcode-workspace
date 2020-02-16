import { NgModule } from '@angular/core';
import { RequestClaimComponent } from './request-claim.component';
import { RequestClaimDialogComponent } from './request-claim-dialog/request-claim.dialog.component';
import { CompleteClaimDialogComponent } from './complete-claim-dialog/complete-claim.dialog.component';
import { MatDialogModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [{
    path:'',
    component:RequestClaimComponent
}]

@NgModule({
    imports: [
        MatDialogModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
      RequestClaimComponent,RequestClaimDialogComponent,CompleteClaimDialogComponent
    ],
    providers: [],
    exports: [],
    entryComponents:[RequestClaimDialogComponent,CompleteClaimDialogComponent]
  })
  export class RequestClaimModule {}
  
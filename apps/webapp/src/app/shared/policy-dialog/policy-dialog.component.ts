import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-policy-dialog',
  templateUrl: './policy-dialog.component.html',
  styleUrls: ['./policy-dialog.component.scss'],
})
export class PolicyDialogComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'policy-dialog secondary';

  constructor(
    public dialogRef: MatDialogRef<PolicyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}

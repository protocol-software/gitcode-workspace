import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'gitcode-expert-evaluation',
  templateUrl: './expert-evaluation.component.html',
  styleUrls: ['./expert-evaluation.component.scss']
})
export class ExpertEvaluationComponent implements OnInit {
  // private ConfirmExpertDialog: any;
  private dialogConfig = {
    width:'384px',
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  confirmExpert() {
    const config: MatDialogConfig = this.dialogConfig;
    this.dialog.open(ConfirmExpertDialog, config);
  }
}

@Component({
  selector: 'code-review-detail-dialog',
  template: '' +
    '<div class="flex justify-end">\n' +
      '    <button mat-dialog-close class="close-icon" tabindex="-1">\n' +
      '        <mat-icon>close</mat-icon>\n' +
      '    </button>\n' +
      '</div>\n' +
      '<div mat-dialog-content class="max-w-sm">\n' +
      '    <div class="max-w-sm">\n' +
      '        <div class="font-bold text-base text-charcoal  pb-3">리뷰 평가 완료</div>\n' +
      '        <div>\n' +
      '            <div class="text-sm text-charcoal h-20">\n' +
      '                코드리뷰 평가가 완료되었습니다.<br>\n' +
      '                감사합니다.\n' +
      '            </div>\n' +
      '            <div class="text-blue text-sm flex justify-end">\n' +
      '                <div class="mr-3 cursor-pointer" (click)="confirmBox()">확인</div>\n' +
      '            </div>\n' +
      '        </div>\n' +
      '    </div>\n' +
      '</div>'
})
export class ConfirmExpertDialog {
  constructor(public dialog:MatDialog){}
  confirmBox(){ // it is working, IDE dones't check it exactly that is why this function color is gray.
    this.dialog.closeAll();
  };

}
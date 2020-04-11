import { Component, HostBinding, OnInit } from '@angular/core';
import { MatRadioChange, MatGridList } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-mypage-public-pr',
  templateUrl: './mypage_public_pr.component.html',
  styleUrls: ['./mypage_public_pr.component.scss'],
})
export class MypagePublicPRComponent implements OnInit  {
  @HostBinding('class') public hostClass = 'mypage_receive_review light-theme';

  constructor() {}
  public ngOnInit(): void {}

  

}


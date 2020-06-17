import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'gitcode-snack-code',
  templateUrl: './snack-code.component.html',
  styleUrls: ['./snack-code.component.scss']
})
export class SnackCodeComponent implements OnInit {

  snackCodeId: string;
  isSmallScreen: boolean;

  constructor(
      private readonly route: ActivatedRoute,
  )
  {
    this.route.params.subscribe(params => {
      this.snackCodeId = params.snackCodeId;
    });
  }

  ngOnInit(): void {
  }


}

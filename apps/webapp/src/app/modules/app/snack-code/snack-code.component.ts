import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'protocol-snack-code',
  templateUrl: './snack-code.component.html',
  styleUrls: ['./snack-code.component.scss']
})
export class SnackCodeComponent implements OnInit {

  categoryItems: string;
  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.categoryItems = params['categoryItems'];
    });
  }

  ngOnInit(): void {
  }

}

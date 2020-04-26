import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {categoryList} from '../snack-code.data';

@Component({
  selector: 'protocol-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  categoryList = categoryList;
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

}

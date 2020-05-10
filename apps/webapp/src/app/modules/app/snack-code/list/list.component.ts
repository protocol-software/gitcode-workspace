import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'protocol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {  
  public checkedCategories = [];  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    ) { 
    this._route.queryParams.subscribe(params => {
      const categoryItems = params['categoryItems'];
      this.checkedCategories = (categoryItems) ? categoryItems.split(',') : [];      
    })
  }

  ngOnInit(): void {

  }

  public toggleCateItem (cateItem) {    
    const checkedIndex = this.checkedCategories.indexOf(cateItem)
    if(checkedIndex > -1) {
      this.checkedCategories.splice(checkedIndex, 1)
    }else{
      this.checkedCategories.push(cateItem)
    }    
    let queryParams = {}
    if(this.checkedCategories.length > 0) {      
      queryParams = {
        categoryItems: this.checkedCategories.toString()
      }      
    }
    this._router.navigate([`/snack-code`], {queryParams: queryParams})
  }

}

import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {categoryList} from '../snack-code.data';
import {SnackCodeService} from '../../../../services/snack-code.service';
@Component({
  selector: 'protocol-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {    
  private checkedCategories = []
  public categoryOptions = [];    
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: SnackCodeService) {            
      _route.queryParams.subscribe(params => {
        const categoryItems = params['categoryItems']
        this.checkedCategories = (categoryItems) ? categoryItems.split(',') : []
        this.initCategories()
      })      
  }

  ngOnInit(): void {
    this.loadTags()
  }

  private async loadTags () {
    this._service.getTags().subscribe(result => {
      console.log(result);
    });
  }

  private initCategories () { 
    this.categoryOptions = []   
    for(let item of categoryList) {
      for(let subItem of item.subCategoryList) {        
        subItem.checked = (this.checkedCategories.indexOf(subItem.name) > -1)
      }
      this.categoryOptions.push(item)
    }
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

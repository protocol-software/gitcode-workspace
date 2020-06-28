import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SnackCodeService} from '../../../../services/snack-code.service';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'gitcode-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {    
  private checkedCategories = [];
  public categoryOptions = [];    
  private categoryList = [];
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: SnackCodeService) {            
  }

  async ngOnInit() {    
    await this.loadTags()
    this._route.queryParams.subscribe(params => {
      const categoryItems = params['categoryItems']
      this.checkedCategories = (categoryItems) ? categoryItems.split(',') : []
      this.initCategories()
    })
  }

  private async loadTags () {
    let tags = await this._service.getTags().toPromise();
    const categoryList = tags.reduce((acc, item)=>{
      const key = item.categoryType
      const subItem = {name: item.tagName, checked: false}
      if(!acc[key]) {
        acc[key] = {
          name: key,
          subCategoryList: [subItem]
        }
      }else{
        acc[key].subCategoryList.push(subItem)
      }
      return acc
    }, {})
    this.categoryList = Object.values(categoryList)    
  }

  private initCategories () { 
    this.categoryOptions = []   
    for(let item of this.categoryList) {
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

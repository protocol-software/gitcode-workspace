import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {SnackCodeService} from '../../../../services/snack-code.service';
import {CodeTagDto} from '@re-code-io/data';

@Component({
  selector: 'protocol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {  
  public checkedCategories = [];  
  public contentList = [];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: SnackCodeService
    ) { 
    this._route.queryParams.subscribe(params => {
      const categoryItems = params['categoryItems'];
      this.checkedCategories = (categoryItems) ? categoryItems.split(',') : [];      
      this.loadContentList()
    })
  }

  ngOnInit() {
    
  }

  private async loadContentList () {    
    const payload: [CodeTagDto] = this.checkedCategories.reduce((acc, item)=>{
      acc.tabName = item
      return acc
    }, {tabName: null, categoryType: null})
    this.contentList = await this._service.getContents(payload).toPromise();    
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

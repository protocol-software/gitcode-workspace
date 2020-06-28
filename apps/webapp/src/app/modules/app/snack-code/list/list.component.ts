import {Component, EventEmitter, Input, OnInit, ViewChild, Output, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {SnackCodeService} from '../../../../services/snack-code.service';
import {CodeTagDto} from '@gitcode/data';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subject} from "rxjs";
import {PaginatePipeArgs} from "ngx-pagination/dist/paginate.pipe";
import {BasicLayoutComponent} from "../../../../layout/layouts/basic/basic.component"

// data
import {CONTENT_LIST} from "../../../../data/dummy.data";

@Component({
  selector: 'gitcode-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    contentList = [];
    public checkedCategories = [];
    itemsPerPage = 5;
    currentPage;
    totalItems;
    // p: string | number;

    collection=[];
    res: string | number;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: SnackCodeService
    ) {
        this._route.queryParams.subscribe(params => {
          const categoryItems = params['categoryItems'];
          this.checkedCategories = (categoryItems) ? categoryItems.split(',') : [];
          // this.loadContentList();
          for(let i=1;i<=100;i++){
              this.collection.push(i);
          };
        }
     )
    }

  ngOnInit() {
        this.fetch(1);
  }

  private fetch(pageNo): void {
        this.currentPage = pageNo;

        this.contentList = CONTENT_LIST.slice(this.itemsPerPage * (this.currentPage-1), this.itemsPerPage * this.currentPage);
        this.totalItems = CONTENT_LIST.length;

        console.log(this.itemsPerPage * (this.currentPage-1), this.itemsPerPage * this.currentPage);
  }



    private async loadContentList () {
    // const payload: [CodeTagDto] = this.checkedCategories.reduce((acc, item)=>{
    //   acc.tabName = item
    //   return acc
    // }, {tabName: null, categoryType: null})
    // this.contentList = await this._service.getContents(payload).toPromise();
  }

  public toggleCateItem (cateItem) {
    // const checkedIndex = this.checkedCategories.indexOf(cateItem)
    // if(checkedIndex > -1) {
    //   this.checkedCategories.splice(checkedIndex, 1)
    // }else{
    //   this.checkedCategories.push(cateItem)
    // }
    // let queryParams = {}
    // if(this.checkedCategories.length > 0) {
    //   queryParams = {
    //     categoryItems: this.checkedCategories.toString()
    //   }
    // }
    // this._router.navigate([`/snack-code`], {queryParams: queryParams})
  }

    getArrayFromNumber(length) {
     return new Array (length/10);
    }


    public pageChange(pageNo): void {
        this.fetch(pageNo);
    }

}

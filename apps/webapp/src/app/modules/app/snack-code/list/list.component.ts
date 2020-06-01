import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {SnackCodeService} from '../../../../services/snack-code.service';
import {CodeTagDto} from '@re-code-io/data';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {PaginatePipeArgs} from "ngx-pagination/dist/paginate.pipe";
import {BasicLayoutComponent} from "../../../../layout/layouts/basic/basic.component"

@Component({
  selector: 'protocol-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // @Output() myEvent = new EventEmitter();
  // function2(){
  //     this.isScreenSmall
  // }
  public checkedCategories = [];
  public contentList = [
      {
          id:'1',
          tag:['angularJS','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'1 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'2222',
          vote_down:'4',
      },
      {
        id:'2',
        tag:['angularJS2','typescript','firebase','angular9','mongoDB','AWS'],
        content_title:'2 Please code review here',
        snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
        vote_up:'1111',
        vote_down:'4',
      },
      {
        id:'3',
        tag:['angularJS3','typescript','firebase','angular9','mongoDB','AWS'],
        content_title:'3 Please code review here',
        snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
        vote_up:'3333',
        vote_down:'4',
      },   {
        id:'4',
        tag:['angularJS4','typescript','firebase','angular9','mongoDB','AWS'],
        content_title:'4 Please code review here',
        snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
        vote_up:'4444',
        vote_down:'5',
      },   {
        id:'5',
        tag:['angularJS5','typescript','firebase','angular9','mongoDB','AWS'],
        content_title:'5 Please code review here',
        snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
        vote_up:'555',
        vote_down:'5',
      }, {
        id:'6',
        tag:['angularJS6','typescript','firebase','angular9','mongoDB','AWS'],
        content_title:'6 Please code review here',
        snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
        vote_up:'66',
        vote_down:'4',
      }, {
        id:'7',
        tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
        content_title:'7 Please code review here',
        snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
        vote_up:'77',
        vote_down:'4',
      },{
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },{
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },{
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
      {
          id:'7',
          tag:['angularJS7','typescript','firebase','angular9','mongoDB','AWS'],
          content_title:'7 Please code review here',
          snippet:'The code review process also referred to as peer review, stands out as a tried and tested method in a large palette of applications to allow for the systematic examination of software source code. It\'s conducted to find bugs and improve the overall quality of the software.',
          vote_up:'77',
          vote_down:'4',
      },
  ];
  itemsPerPage: PaginatePipeArgs;
  p: string | number;
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
      // console.log{this.checkedCategories}
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
}

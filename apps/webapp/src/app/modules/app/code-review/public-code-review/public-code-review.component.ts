import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, QueryFn } from '@angular/fire/firestore';
import { IUser } from '@gitcode/data';
import { Observable, Subject } from 'rxjs';
import { retry, takeUntil } from 'rxjs/operators';
// import {FormControl} from "@angular/forms";
// import { Pipe, PipeTransform } from '@angular/core';
// import {MatCheckboxChange} from "@angular/material/checkbox";
import { AuthService } from '../../../../services/auth.service';
import { PublicCodeReviewService } from '../../../../services/public-code-review.service';
import { CodeReviewDetailService } from './code-review-detail/code-review-detail.service';
import { RequestCodeReviewService } from './request-code-review/request-code-review.service';

@Component({
  selector: 'gitcode-public-code-review',
  templateUrl: './public-code-review.component.html',
  styleUrls: ['./public-code-review.component.scss'],
})
export class PublicCodeReviewComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'public-code-review';

  contentList: Observable<any[]>;

  public codeReviewItems: any[] = [];

  // contentListLength : any = [];
  // itemsPerPage = 5;
  // currentPage;
  // totalItems;
  // public errorMsg;
  // toppings = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage',
  // 'Tomato','Tomato','Tomato','Tomato','Tomato','Tomato','Tomato','Tomato','Tomato']; frameworks = new FormControl();
  // frameworksList: string[] = ['Angular','AngularJS','Angular 2+','Angular 8+','Angular
  // 9','Laravel','Express','Django','Rails','Spring','React','React','Vue','Ember','Backbone']; listStatuses = new
  // FormControl(); data: Object;


  // answer: Answer[];
  // this.answer = new Array<Answer>();

  isOnlyMyPR = false;
  isSelectedStatus: string;

  // isSelectedMyPost2 :any =[];
  // contentStatusList: IStatusList[] = [];
  // peopleFilter: [];

  private _unsubscribeAll: Subject<any>;
  public user: IUser;
  hasContent: boolean = null;

  private pageSize = 10;
  private lastDocInResponse: QueryDocumentSnapshot<any> = null;
  public hasMoreDocuments = false;

  constructor(
    private requestCodeReviewService: RequestCodeReviewService,
    private codeReviewDeatilService: CodeReviewDetailService,
    private publicCodeReviewService: PublicCodeReviewService,
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
  ) {
    this._unsubscribeAll = new Subject();
  }

  public ngOnInit(): void {
    this.publicCodeReviewList();
    // this.statusesList();
    // this.fetch(1);

    this.authService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: IUser) => {
          this.user = user;
        });
  }

  public ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private publicCodeReviewList(): void {
    const query: QueryFn = (ref) => ref
      .limit(this.pageSize)
      .orderBy('createdAt', 'desc');
    this.angularFirestore
        .collection('public-code-review', query)
        .snapshotChanges()
        .pipe(
          retry(2),
        )
        .subscribe((res) => {
          this.hasContent = res?.length > 0;
          const data = res?.map(item => item.payload.doc.data());
          // this.codeReviewItems = [...this.codeReviewItems, ...data];
          this.codeReviewItems = data;
          this.lastDocInResponse = res[res.length - 1]?.payload.doc;
          this.hasMoreDocuments = res?.length >= this.pageSize;
        });
    // this.publicCodeReviewService.getPublicCodeReviewList()
    //     .subscribe(data => this.contentList = data,
    //         error => this.errorMsg = error);{
    // }
  }

  public loadMoreDocuments(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.lastDocInResponse) {
      return;
    }

    const query: QueryFn = (ref) => ref
      .limit(this.pageSize)
      .orderBy('createdAt', 'desc')
      .startAfter(this.lastDocInResponse);
    this.angularFirestore
        .collection('public-code-review', query)
        .get()
        .subscribe((res) => {
          const data = res.docs.map(doc => doc.data());
          this.codeReviewItems = [...this.codeReviewItems, ...data];
          this.lastDocInResponse = res?.docs[res.docs.length - 1];
          this.hasMoreDocuments = res?.docs?.length >= this.pageSize;
        });
  }

  // private statusesList(){
  //   this.publicCodeReviewService.getStatusList()
  //       .subscribe(data => this.contentStatusList= data,
  //           error => this.errorMsg = error);{
  //   }
  // }


  // private fetch(pageNo): void {
  //   this.currentPage = pageNo;
  //   this.contentListLength = this.contentListLength.slice(this.itemsPerPage * (this.currentPage-1),
  // this.itemsPerPage * this.currentPage); this.totalItems = this.contentListLength.length; }  public
  // pageChange(pageNo): void { this.fetch(pageNo); }

  async createReview(event: MouseEvent): Promise<void> {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    let signdeIn = !!this.user;
    if (!signdeIn) {
      signdeIn = await this.authService.signIn();

      if (!signdeIn) {
        return;
      }
    }

    const dialogClosed = this.requestCodeReviewService.open();
    dialogClosed.subscribe(
      (result) => {
        if (!result) {
          return;
        }
      },
    );
  }

  openReviewDetail(event: MouseEvent, item: any): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const dialogClosed = this.codeReviewDeatilService.open({ item });
  }

  // filterItemOfType(postId:number) {
  // return this.contentList.filter(data=> data.postId == postId);
  // }

  // getCheckboxes() {
  // console.log(this.isSelectedStatus);
  // return this.isSelectedStatus;
  // }
}

// @Pipe({ name: 'frameworks' })
// export class SelectFrameworksPipe implements PipeTransform {
//   transform(frameworks: IPublicCodeReviewList[]) {
//     return frameworks.filter(frameworks => frameworks.tags == ["Angular"]);
//   }
// }



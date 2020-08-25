import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, CollectionReference, Query, QueryDocumentSnapshot, QueryFn } from '@angular/fire/firestore';
import { IUser } from '@gitcode/data';
import { Subject } from 'rxjs';
import { retry, take, takeUntil } from 'rxjs/operators';
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

  // contentList: Observable<any[]>;

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

  // isOnlyMyPR = false;
  // isSelectedStatus: string;

  // isSelectedMyPost2 :any =[];
  // contentStatusList: IStatusList[] = [];
  // peopleFilter: [];

  private _unsubscribeAll: Subject<any>;
  public user: IUser;
  hasContent: boolean = null;

  private pageSize = 10;
  public hasMoreDocuments = false;
  private lastDocInResponse: QueryDocumentSnapshot<any> = null;

  private query: Query;
  private filter: any;

  constructor(
    private requestCodeReviewService: RequestCodeReviewService,
    private codeReviewDetailService: CodeReviewDetailService,
    private publicCodeReviewService: PublicCodeReviewService,
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
  ) {
    this._unsubscribeAll = new Subject();
  }

  public ngOnInit(): void {
    this.loadDocuments();
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

  private loadDocuments(): void {
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
          const data: any = res?.map(item => Object.assign({ id: item.payload.doc.id }, item.payload.doc.data()));
          // this.codeReviewItems = [...this.codeReviewItems, ...data];
          this.codeReviewItems = data.filter(item => item.state !== 'deleted');
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

    this.angularFirestore
        .collection('public-code-review', this.buildQuery.bind(this))
        .get()
        .pipe(
          retry(2),
        )
        .subscribe((res) => {
          const data: any = res.docs.map(doc => Object.assign({ id: doc.id }, doc.data()));
          this.codeReviewItems = [...this.codeReviewItems, ...data.filter(item => item.state !== 'deleted')];
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

  public openReviewDetail(event: MouseEvent, item: any): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const dialogRef = this.codeReviewDetailService.open({ item });
  }

  // filterItemOfType(postId:number) {
  // return this.contentList.filter(data=> data.postId == postId);
  // }

  // getCheckboxes() {
  // console.log(this.isSelectedStatus);
  // return this.isSelectedStatus;
  // }

  public onFilterFormSubmitted(filterValue: any): void {
    this.filter = filterValue;
    this.lastDocInResponse = null;

    this.angularFirestore
        .collection('public-code-review', this.buildQuery.bind(this))
        .get()
        .pipe(
          take(1),
          retry(2),
        )
        .subscribe((res) => {
          const data: any = res.docs.map(doc => Object.assign({ id: doc.id }, doc.data()));
          this.codeReviewItems = data;
          this.lastDocInResponse = res?.docs[res.docs.length - 1];
          this.hasMoreDocuments = res?.docs?.length >= this.pageSize;
        });
  }

  private buildQuery(ref: CollectionReference): Query {
    let query: Query = ref.limit(this.pageSize)
                          .orderBy('createdAt', 'desc');

    if (this.lastDocInResponse) {
      query = query.startAfter(this.lastDocInResponse);
    }

    if (this.filter) {
      const searchValues = [
        ...this.filter.frameworks,
        ...this.filter.languages,
        ...this.filter.databases,
      ].map((item: string) => item.toLowerCase());

      if (searchValues && searchValues.length) {
        query = query.where('githubPR.languages', 'array-contains-any', searchValues);
      }

      if (this.filter.isOnlyMyPRs && this.user) {
        query = query.where('author.uid', '==', this.user?.uid);
      }
    }

    return query;
  }
}

// @Pipe({ name: 'frameworks' })
// export class SelectFrameworksPipe implements PipeTransform {
//   transform(frameworks: IPublicCodeReviewList[]) {
//     return frameworks.filter(frameworks => frameworks.tags == ["Angular"]);
//   }
// }



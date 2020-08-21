import { Component, HostBinding, OnInit } from '@angular/core';
import { AngularFirestore, CollectionReference, Query, QueryDocumentSnapshot, QueryFn } from '@angular/fire/firestore';
import { IUser } from '@gitcode/data';
import { retry } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth.service';
import { PaymentDialogService } from '../../../../shared/payment-dialog/payment-dialog.service';
import { CodeReviewDetailService } from './code-review-detail/code-review-detail.service';
import { RequestCodeReviewService } from './request-code-review/request-code-review.service';

@Component({
  selector: 'gitcode-private-code-review',
  templateUrl: './private-code-review.component.html',
  styleUrls: ['./private-code-review.component.scss'],
})
export class PrivateCodeReviewComponent implements OnInit {
  @HostBinding('class') public hostClass = 'private-code-review';

  public codeReviewItems: any[] = [];
  public hasMoreDocuments = false;

  private pageSize = 10;
  private lastDocInResponse: QueryDocumentSnapshot<any> = null;

  public user: IUser;
  public hasContent: boolean = null;
  private filter: any;

  constructor(
    private requestCodeReviewService: RequestCodeReviewService,
    private codeReviewDetailService: CodeReviewDetailService,
    private paymentDialogService: PaymentDialogService,
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    this.loadDocuments();

    this.authService.user$
        .pipe(
          retry(2),
          // take(1),
        )
        .subscribe((user: IUser) => {
          this.user = user;
        });
  }

  createReview(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
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

  public createReviewDetail(event: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    const dialogClosed = this.codeReviewDetailService.open();
    dialogClosed.subscribe(
      (result) => {
        if (!result) {
          return;
        }
      },
    );
  }

  public createDialogPayment(): void {
    this.paymentDialogService.open({ githubId: this.user?.providerUserData.github.login, user: this.user });
  }

  private loadDocuments(): void {
    const query: QueryFn = (ref) => ref
      .limit(this.pageSize)
      .orderBy('createdAt', 'desc');
    this.angularFirestore
        .collection('private-code-review', query)
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
        .collection('private-code-review', this.buildQuery.bind(this))
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

  public openReviewDetail(event: MouseEvent, item: any): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const dialogRef = this.codeReviewDetailService.open({ item });
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

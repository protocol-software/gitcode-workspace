import { Direction } from '@angular/cdk/bidi';
import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { DialogRole, MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ICodeReviewBestAnswer, ICodeReviewItem, IGithubComment, IUser } from '@gitcode/data';
import { TranslateService } from '@ngx-translate/core';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { forkJoin } from 'rxjs';
import { finalize, map, retry, take } from 'rxjs/operators';
import { DialogService } from '../../../../../../../../../libs/ui/src/lib/dialogs/dialog.service';
import { AuthService } from '../../../../../services/auth.service';
import { GitHubService } from '../../../../../services/github.service';
import { ExpertEvaluationComponent } from '../expert-evaluation/expert-evaluation.component';

export interface DialogData {
  animal: string;
  name: string;
  item: any;
}

@Component({
  selector: 'gitcode-code-review-detail',
  templateUrl: './code-review-detail.component.html',
  styleUrls: ['./code-review-detail.component.scss'],
})
export class CodeReviewDetailComponent implements OnInit {
  @HostBinding('class') public hostClass = 'code-review-detail';

  isReviewRequestComplete: any;
  animal: string;
  name: string;

  public item: ICodeReviewItem;
  public currentUser: IUser;
  public isAuthor = false;
  public comments: IGithubComment[];
  public bestAnswer: ICodeReviewBestAnswer;
  public isLoadingComments = false;
  public usePagination = false;
  public paginationConfig: PaginatePipeArgs = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  public mayHaveMoreComments = false;

  public previousText: string;
  public nextText: string;
  public reviewerName = 'N/A';
  public canEvaluateExpert = false;
  public isExpertEvaluationCompleted = false;

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<CodeReviewDetailDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private githubService: GitHubService,
              private authService: AuthService,
              private angularFirestore: AngularFirestore,
              public translateService: TranslateService,
              private dialogService: DialogService,
  ) {
    this.item = data.item;
    this.paginationConfig.totalItems = this.item.githubPR.comments;
    this.previousText = this.translateService.instant('pagination.previous');
    this.nextText = this.translateService.instant('pagination.next');
    this.getBestAnswer();

    this.authService.user$.subscribe(
      (user) => {
        this.currentUser = user;

        this.isAuthor = !!user && user?.uid === this.item?.author?.uid;
        this.canEvaluateExpert = !!user && user?.uid === this.item?.author?.uid;
      },
    );
  }

  public ngOnInit(): void {
    this.loadComments(1);
  }

  private getBestAnswer(): void {
    if (!this.item) {
      return;
    }

    const query: QueryFn = (ref) => ref
      .where('nodeId', '==', this.item?.githubPR.node_id);
    this.angularFirestore
        .collection('code-review-best-answer', query)
        .snapshotChanges()
        .pipe(
          retry(2),
          take(1),
        )
        .subscribe(
          (docs) => {
            this.bestAnswer = docs[0]?.payload.doc.data() as ICodeReviewBestAnswer;
          },
        );
  }

  public openDialog($value): void {
    if ($value === 1) {
      const dialogRef = this.dialog.open(CodeReviewDetailDialog, {
        data: { name: this.name, animal: this.animal },
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

    if ($value === 2) {
      const dialogRef = this.dialog.open(CodeReviewDetailDialog, {
        data: { name: this.name, animal: this.animal },
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
  }

  public openDialogBestreview(event: MouseEvent): void {
    this.dialog.open(CodeReviewDetailDialogBestreview);
  }

  public closePopup(event): void {
    this.dialogRef.close(true);
  }

  public openExternalLink(event: MouseEvent, link: string): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!link) {
      return;
    }

    window.open(link, '_blank');
  }

  private loadComments(pageNumber: number): void {
    const ownerName = this.item.githubPR?.user?.login;
    const repoUrl = new URL(this.item.githubPR?.url);
    const repoName = repoUrl?.pathname?.split('/')[3];

    if (!ownerName || !repoName) {
      return;
    }

    this.isLoadingComments = true;

    const requests = [
      this.githubService.getPRComments(
        this.item.githubPR.comments_url,
        +this.paginationConfig.itemsPerPage,
        pageNumber,
      ),
      this.githubService.getPRComments(this.item.githubPR.comments_url)
          .pipe(
            map(comments => comments.length),
          ),
    ];

    forkJoin(requests)
      .pipe(
        retry(2),
        finalize(() => {
          this.isLoadingComments = false;
        }),
      )
      .subscribe(
        (res) => {
          this.comments = res[0] as IGithubComment[];
          this.paginationConfig.totalItems = +res[1];
          this.mayHaveMoreComments = this.comments.length >= this.paginationConfig.itemsPerPage;
        },
      );
  }

  public loadMoreComments(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const ownerName = this.item.githubPR?.user?.login;
    const repoUrl = new URL(this.item.githubPR?.url);
    const repoName = repoUrl?.pathname?.split('/')[3];

    if (!ownerName || !repoName) {
      return;
    }

    this.isLoadingComments = true;
    const pageNumber = +this.paginationConfig.currentPage + 1;

    this.githubService.getPRComments(
      this.item.githubPR.comments_url,
      +this.paginationConfig.itemsPerPage,
      +pageNumber,
    ).pipe(
      retry(2),
      finalize(() => {
        this.isLoadingComments = false;
      }),
    ).subscribe(
      (comments) => {
        (this.paginationConfig.currentPage as number) += 1;
        this.mayHaveMoreComments = comments.length >= this.paginationConfig.itemsPerPage;
        this.comments = [...this.comments, ...comments];
      },
    );
  }

  public trackCommentBy(index: number, comment: IGithubComment): number {
    return comment.id;
  }

  public onBestAnswerChanged(bestAnswer: ICodeReviewBestAnswer): void {
    this.bestAnswer = bestAnswer;
  }

  public onCommentsPageChanged(pageNumber: number): void {
    this.paginationConfig.currentPage = pageNumber;

    this.loadComments(pageNumber);
  }

  public closeCodeReview(event: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.confirmOperation('close');
  }

  public reopenCodeReview(event: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.confirmOperation('reopen');
  }

  public modifyCodeReview(event: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();
  }

  public deleteCodeReview(event: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.confirmOperation('delete');
  }

  private confirmOperation(operation: string): void {
    const confirmTitle = this.translateService.instant(`codeReviewDetail.authorActions.dialog.${operation}.title`);
    const confirmMessage = this.translateService.instant(`codeReviewDetail.authorActions.dialog.${operation}.message`);
    const completeMessage = this.translateService.instant(`codeReviewDetail.authorActions.dialog.${operation}.completeMessage`);
    const yesButtonText = this.translateService.instant('codeReviewDetail.authorActions.dialog.yesButton');
    const noButtonText = this.translateService.instant('codeReviewDetail.authorActions.dialog.noButton');

    const confirmDialogRef = this.dialogService.confirm(
      confirmTitle,
      confirmMessage,
      yesButtonText,
      noButtonText,
    );

    confirmDialogRef.afterClosed().subscribe(
      (isConfirmed) => {
        if (!isConfirmed) {
          return;
        }

        this.dialogService.alert(
          confirmTitle,
          completeMessage,
          yesButtonText,
        );
      }
    );
  }
}

@Component({
  selector: 'code-review-detail-dialog',
  templateUrl: 'code-review-detail-dialog.html',
})
export class CodeReviewDetailDialog {
  isTrue: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CodeReviewDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmBox(event: MouseEvent) {
    if (event) {
      this.isTrue = true;
    }
  }

  public closePopup(event) {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'code-review-detail-dialog-bestreview',
  templateUrl: 'code-review-detail-dialog-bestreview.html',
})
export class CodeReviewDetailDialogBestreview {
  private dialogConfig = {
    autoFocus: false,
    closeOnNavigation: true,
    direction: <Direction>'ltr',
    disableClose: false,
    hasBackdrop: true,
    height: '80vh',
    minHeight: '80vh',
    maxHeight: '100%',
    width: '527px',
    maxWidth: '527px',
    panelClass: ['app-dialog'],
    restoreFocus: false,
    role: <DialogRole>'dialog',
  };
  isTrue: true;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CodeReviewDetailDialogBestreview>) {
  }

  confirmBox() {
    const config: MatDialogConfig = this.dialogConfig;
    config.panelClass = ['app-dialog'];
    this.dialog.open(ExpertEvaluationComponent, config);

  }

  public closePopup() {
    this.dialogRef.close(true);

  }
}


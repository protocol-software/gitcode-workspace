import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICodeReviewBestAnswer, IGithubComment, IGitHubUser, IUser } from '@gitcode/data';
import { SvgIconService } from '@gitcode/util';
import { TranslateService } from '@ngx-translate/core';
import { retry, take } from 'rxjs/operators';
import { DialogService } from '../../dialogs/dialog.service';
import { RateReviewerPrivateDialogService } from '../rate-reviewer-private/dialog/rate-reviewer-private-dialog.service';
import { RateReviewerPublicDialogService } from '../rate-reviewer-public/dialog/rate-reviewer-public-dialog.service';

@Component({
  selector: 'gitcode-code-review-comment',
  templateUrl: './code-review-comment.component.html',
  styleUrls: ['./code-review-comment.component.scss'],
})
export class CodeReviewCommentComponent implements OnChanges {
  @HostBinding('class') public hostClass = 'code-review-comment';

  @Input() public prAuthorUid: string;
  @Input() public comment: IGithubComment;
  @Input() public hasBestAnswer = false;
  @Input() public isBestAnswer = false;
  @Input() public prType: 'public' | 'private' = 'public';
  @Output() public bestAnswerChanged: EventEmitter<ICodeReviewBestAnswer> = new EventEmitter<ICodeReviewBestAnswer>();

  public currentUser: IUser;
  public shouldAllowMarkAsBestAnswer = false;

  constructor(private svgIconService: SvgIconService,
              private angularFirestore: AngularFirestore,
              private dialogService: DialogService,
              private rateReviewerPublicDialogService: RateReviewerPublicDialogService,
              private rateReviewerPrivateDialogService: RateReviewerPrivateDialogService,
              private translateService: TranslateService,
  ) {
    this.svgIconService.registerIcon('reply', '/assets/icons/reply.svg');
    this.svgIconService.registerIcon('star', '/assets/icons/star.svg');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.onIsBestAnswerChanged(changes['isBestAnswer']);
  }

  private onIsBestAnswerChanged(change: SimpleChange): void {
    if (!this.currentUser) {
      this.shouldAllowMarkAsBestAnswer = false;
      return;
    }

    // TODO: only allow the PR owner to mark an answer as the best answer.
    const isPROwner = this.currentUser?.uid === this.prAuthorUid;
    this.shouldAllowMarkAsBestAnswer = !change.currentValue && isPROwner;
  }

  public confirmMarkAsBestAnswer(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const alertDialog = this.dialogService.confirm(
      this.translateService.instant('codeReviewDetail.markAsBestConfirm.title'),
      this.translateService.instant('codeReviewDetail.markAsBestConfirm.message'),
      this.translateService.instant('codeReviewDetail.markAsBestConfirm.confirm'),
      this.translateService.instant('codeReviewDetail.markAsBestConfirm.cancel'),
    );

    alertDialog.afterClosed().subscribe(
      async (answer) => {
        if (!answer) {
          return;
        }

        await this.markAsBestAnswer();
        this.openRateReviewerDialog();
      },
    );
  }

  private async markAsBestAnswer(): Promise<void> {
    const bestAnswer: ICodeReviewBestAnswer = {
      nodeId: this.comment.node_id,
      commentId: this.comment.id,
    };

    // Replace the existing best answer, if exists, instead of adding a new one.
    const query = ref => ref.where('nodeId', '==', this.comment.node_id);
    const bestAnswerComments$ = this.angularFirestore
                                    .collection('code-review-best-answer', query)
                                    .snapshotChanges();

    bestAnswerComments$
      .pipe(
        retry(2),
        take(1),
      )
      .subscribe(
        async (bestAnswerComments) => {
          if (bestAnswerComments?.length) {
            await bestAnswerComments[0].payload.doc.ref.update(bestAnswer);
          } else {
            await this.angularFirestore
                      .collection('code-review-best-answer')
                      .add(bestAnswer);
          }

          this.bestAnswerChanged.emit(bestAnswer);
        },
      );
  }

  private openRateReviewerDialog(): void {
    const dialogData = {
      bestAnswer: {
        nodeId: this.comment.node_id,
        commentId: this.comment.id,
      },
    };
    const dialogRef = this.prType === 'public'
                      ? this.rateReviewerPublicDialogService.open(dialogData)
                      : this.rateReviewerPrivateDialogService.open(dialogData);

    dialogRef.afterClosed().subscribe(
      (data) => {
        // console.log(data);
      },
    );
  }
}

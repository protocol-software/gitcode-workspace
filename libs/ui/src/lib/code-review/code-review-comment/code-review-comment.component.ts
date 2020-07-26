import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICodeReviewBestAnswer, IGithubComment } from '@gitcode/data';
import { SvgIconService } from '@gitcode/util';
import { retry, take } from 'rxjs/operators';

@Component({
  selector: 'gitcode-code-review-comment',
  templateUrl: './code-review-comment.component.html',
  styleUrls: ['./code-review-comment.component.scss'],
})
export class CodeReviewCommentComponent {
  @HostBinding('class') public hostClass = 'code-review-comment';

  @Input() public comment: IGithubComment;
  @Input() public hasBestAnswer = false;
  @Input() public isBestAnswer = false;
  @Output() public bestAnswerChanged: EventEmitter<ICodeReviewBestAnswer> = new EventEmitter<ICodeReviewBestAnswer>();

  // TODO: only allow the author to mark an answer as the best answer.
  public shouldAllowMarkAsBestAnswer = true;

  constructor(private svgIconService: SvgIconService,
              private angularFirestore: AngularFirestore,
  ) {
    this.svgIconService.registerIcon('reply', '/assets/icons/reply.svg');
    this.svgIconService.registerIcon('star', '/assets/icons/star.svg');
  }

  public async markAsBestAnswer(event: MouseEvent): Promise<void> {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const bestAnswer: ICodeReviewBestAnswer = {
      nodeId: this.comment.node_id,
      commentId: this.comment.id,
    };

    // Replace the existing best answer, if exists, instead of adding a new one.
    const query = ref => ref.where('nodeId', '==', this.comment.node_id);
    const bestAnswerComments$ = this.angularFirestore
                                    .collection('code-review-best-answer', query)
                                    .snapshotChanges()
                                    .pipe(
                                      retry(2),
                                      take(1),
                                    );

    bestAnswerComments$.subscribe(
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
}

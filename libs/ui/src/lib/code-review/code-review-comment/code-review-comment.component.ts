import { Component, HostBinding, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IGithubComment } from '@gitcode/data';
import { SvgIconService } from '@gitcode/util';
import { ICodeReviewBestAnswer } from '../../../../../data/src/lib/interfaces/code-review-best-answer.interface';

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

    await this.angularFirestore
              .collection('code-review-best-answer')
              .add(bestAnswer);
  }
}

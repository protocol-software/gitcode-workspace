import { Component, HostBinding, Input } from '@angular/core';
import { IGithubComment } from '@gitcode/data';
import { SvgIconService } from '@gitcode/util';

@Component({
  selector: 'gitcode-code-review-comment',
  templateUrl: './code-review-comment.component.html',
  styleUrls: ['./code-review-comment.component.scss'],
})
export class CodeReviewCommentComponent {
  @HostBinding('class') public hostClass = 'code-review-comment';

  @Input() public comment: IGithubComment;

  constructor(private svgIconService: SvgIconService) {
    this.svgIconService.registerIcon('reply', '/assets/icons/reply.svg');
    this.svgIconService.registerIcon('star', '/assets/icons/star.svg');
  }

  public markAsBestAnswer(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // TODO: implement best-answer setting.
  }
}

import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'gitcode-code-review-users',
  templateUrl: './code-review-users.component.html',
  styleUrls: ['./code-review-users.component.scss'],
})
export class CodeReviewUsersComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'code-review-user';

  @Input() public users: { name: string, photoUrl: string }[];
  public maxStackedPhotoCount = 4;

  constructor() {
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}
}

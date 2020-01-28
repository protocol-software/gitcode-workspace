import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthProvider } from '@re-code-io/data';
import { AuthService, DialogService, ImageService } from '@re-code-io/ui';
import { map } from 'rxjs/operators';
import { SignUpDialogService } from '../sign-up-dialog/sign-up-dialog.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'landing light-theme';

  public isAuthenticated = false;

  constructor(
    public imageService: ImageService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private signUpDialogService: SignUpDialogService,
    private dialogService: DialogService,
  ) {
    const prefetch = this.route.snapshot.data.prefetch;

    this.authService.user$
        .pipe(
          // take(1),
          // debounceTime(300),
          map((user) => {
            this.isAuthenticated = !!user;
            return user;
          }),
        )
        .subscribe();
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public signUp(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.isAuthenticated) {
      const confirmDialogClosed = this.dialogService.confirm(
        '알림',
        '이미 가입된 회원입니다.<br>코드리뷰를 신청하시겠어요?',
        'light-theme',
        '코드리뷰 신청',
        '취소',
      );

      confirmDialogClosed.subscribe(
        (result) => {
          console.log(result);
        },
      );

      return;
    }

    const dialogClosed = this.signUpDialogService.open();
    dialogClosed.subscribe(
      (result) => {
        if (!result) {
          return;
        }

        this.authService.signInOAuth(OAuthProvider.GITHUB);
      },
    );
  }

  public signIn(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.authService.signInOAuth(OAuthProvider.GITHUB);
  }
}

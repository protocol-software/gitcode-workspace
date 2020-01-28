import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IGitHubUser, IInboxMessage, ILanguageSelectorItem, IUser, OAuthProvider } from '@re-code-io/data';
import { AuthService, InboxService, LanguageService } from '@re-code-io/ui';
import * as _ from 'lodash';
import { map, tap } from 'rxjs/operators';
import { AppConfig } from '../../config/app-config';
import { SignUpDialogService } from '../sign-up-dialog/sign-up-dialog.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'layout';

  // Flag code can be found at https://www.countryflags.io/.
  public availableLanguages: ILanguageSelectorItem[] = [
    // { languageCode: 'cn', flagCode: 'cn' },
    { languageCode: 'en', flagCode: 'us' },
    { languageCode: 'ko', flagCode: 'kr' },
    // { languageCode: 'th', flagCode: 'th' },
    // { languageCode: 'vn', flagCode: 'vn' },
  ];
  public selectedLanguageCode;

  public mobileQuery: MediaQueryList;
  public menuItems = [
    { text: 'Home', link: '/', enabled: false },
    { text: 'Landing', link: '/landing', enabled: true },
    { text: 'How it works', link: '/how-it-works', enabled: true },
    { text: 'Pricing', link: '/pricing', enabled: true },
    { text: 'PRs', link: '/pull-requests', enabled: true },
    { text: 'Learn to code', link: '/learn-to-code', enabled: true },
  ];
  public isAuthenticating = true;
  public isAuthenticated = false;
  public user: IUser;
  public gitHubUser: IGitHubUser;
  public inboxMessages: IInboxMessage[];
  public shouldShowBadge = false;
  public newMessageCount = 0;

  private mobileQueryListener: () => void;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private signUpDialogService: SignUpDialogService,
    private inboxService: InboxService,
    private languageService: LanguageService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();

    if (this.mobileQuery.addEventListener) {
      this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

    this.authService.user$
        .pipe(
          // take(1),
          // debounceTime(300),
          map((user) => {
            this.isAuthenticated = !!user;
            this.isAuthenticating = false;

            return user;
          }),
          tap((user) => {
            this.user = user;

            if (!user) {
              return;
            }

            this.gitHubUser = user.providerUserData['github'];
            this.inboxService.getUserInboxMessages(user.uid).pipe(
              tap(
                (messages) => {
                  const unreadMessages = _.orderBy(
                    messages.filter(item => !item.isHidden && !item.isRead),
                    item => item.createdAt.seconds,
                    ['desc'],
                  );
                  const readMessages = _.orderBy(
                    messages.filter(item => !item.isHidden && item.isRead),
                    item => item.createdAt.seconds,
                    ['desc'],
                  );

                  this.inboxMessages = [...unreadMessages, ...readMessages];
                  this.shouldShowBadge = this.inboxMessages.reduce(
                    (result, message) => result || !message.isRead,
                    false,
                  );
                  this.newMessageCount = this.inboxMessages.filter(message => !message.isRead).length;
                },
              ),
            ).subscribe();

            // TODO: if no email is set (due to user's privacy setting), ask a user to enter an email address to
            //  complete his profile.
          }),
        )
        .subscribe();
  }

  public ngOnInit(): void {
    const cachedSelectedLanguage = localStorage.getItem('language');
    this.selectedLanguageCode = cachedSelectedLanguage || AppConfig.defaultLang;
    this.languageService.CurrentLanguage = this.selectedLanguageCode;
  }

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {
    if (this.mobileQuery.removeEventListener) {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }
  }

  public ngAfterViewInit(): void {}

  public signUp(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
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

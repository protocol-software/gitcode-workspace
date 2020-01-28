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

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'layout';

  public mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;
  public menuList: any[] = [
    { title: 'Users', routerLink: '/users' },
    { title: 'Admin Users', routerLink: '/admin-users' },
    { title: 'Subscribers', routerLink: '/subscribers' },
    { title: 'Public PRs', routerLink: '/public-prs' },
    { title: 'Private PRs', routerLink: '/private-prs' },
    { title: 'Payment History', routerLink: '/payment-history' },
    { title: 'Github Webhook Logs', routerLink: '/github-webhook-logs' },
  ];

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // NOTE: This doesn't work on Safari.
    // this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  public ngAfterViewInit(): void {}
}

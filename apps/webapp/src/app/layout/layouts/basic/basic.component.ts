import { Component, HostBinding, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TreoNavigationItem, TreoNavigationService } from '../../../../@treo/components/navigation';
import { TreoMediaWatcherService } from '../../../../@treo/services/media-watcher';
import { AuthService } from '../../../services/auth.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'basic-layout',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BasicLayoutComponent implements OnInit, OnDestroy {
  @HostBinding('class') public hostClass = 'basic-layout';

  data: any;
  isScreenSmall: boolean;
  authenticated = false;

  @HostBinding('class.fixed-header')
  fixedHeader: boolean;

  @HostBinding('class.fixed-footer')
  fixedFooter: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  public navigationConfig$: Observable<{ [key: string]: TreoNavigationItem[] }>;

  /**
   * Constructor
   *
   * @param {ActivatedRoute} _activatedRoute
   * @param {TreoMediaWatcherService} _treoMediaWatcherService
   * @param {TreoNavigationService} _treoNavigationService
   * @param {Router} _router
   * @param authService
   * @param afAuth
   * @param navigationService
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _treoMediaWatcherService: TreoMediaWatcherService,
    private _treoNavigationService: TreoNavigationService,
    public _router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private navigationService: NavigationService,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    // Set the defaults
    this.fixedHeader = false;
    this.fixedFooter = false;

    this.authService.check()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(result => {
          this.authenticated = result;
        });

    this.navigationConfig$ = this.afAuth.authState.pipe(
      map(authState => this.navigationService.getNavigationConfig(!!authState)),
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the resolved route data
    this._activatedRoute.data.subscribe((data: Data) => {
      this.data = data.initialData;
    });

    // Subscribe to media changes
    this._treoMediaWatcherService.onMediaChange$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(({ matchingAliases }) => {

          // Check if the breakpoint is 'lt-md'
          this.isScreenSmall = matchingAliases.includes('lt-md');
        });

    // Home , Header Color make different
    this._router.url;
    return;

    // Dark or Light
    this.detectScreenSize();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle navigation
   *
   * @param key
   */
  toggleNavigation(key): void {
    // Get the navigation
    const navigation = this._treoNavigationService.getComponent(key);

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

  private detectScreenSize() {
    if (this.isScreenSmall = window.innerWidth < 959) {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.detectScreenSize();
  }

}

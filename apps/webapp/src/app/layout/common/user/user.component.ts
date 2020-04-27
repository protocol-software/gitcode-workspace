import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {SignUpDialogService} from '../../../shared/sign-up-dialog/sign-up-dialog.service';
import {IUser, OAuthProvider} from '@re-code-io/data';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    styleUrls      : ['./user.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'
})
export class UserComponent implements OnInit, OnDestroy
{
    @Input()
    showAvatar: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;
    public user: IUser;

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {Router} _router
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private signUpDialogService: SignUpDialogService,
        private authService: AuthService,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // Set the defaults
        this.showAvatar = true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to user changes
        // this._userService.user$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((user: IUser) => {
        //         this._user = user;
        //     });

        this.authService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: IUser) => {
                this.user = user;

            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status): void
    {
        // Update the user data
        // this.user.status = status;

        // Update the user on the server
        // this._userService.update(this.user);
    }

    /**
     * Sign out
     */
    signOut(): void
    {
        // this._router.navigate(['/sign-out']);
        this.authService.signOut();
    }
    moveTo(path: string): void
    {
        this._router.navigate([path]);
    }

    public signUp(event: MouseEvent): void {
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

    public signIn(event: MouseEvent): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.authService.signInOAuth(OAuthProvider.GITHUB);
    }
}

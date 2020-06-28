import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import {compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation} from './data/navigation.data';
import * as _ from 'lodash';
import {AuthService} from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private authService: AuthService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Load messages
     *
     * @private
     */
    private _loadMessages(): Observable<any>
    {
        // return this._httpClient.get('api/common/messages');
        return of({
            messages: []
        });
    }

    /**
     * Load navigation data
     *
     * @private
     */
    private _loadNavigation(): Observable<any>
    {
        return of({
            compact   : _.cloneDeep(compactNavigation),
            default   : _.cloneDeep(defaultNavigation),
            futuristic: _.cloneDeep(futuristicNavigation),
            horizontal: _.cloneDeep(horizontalNavigation)
        });
    }

    /**
     * Load notifications
     *
     * @private
     */
    private _loadNotifications(): Observable<any>
    {
        // return this._httpClient.get('api/common/notifications');
        return of({
            notifications: []
        });
    }

    /**
     * Load shortcuts
     *
     * @private
     */
    private _loadShortcuts(): Observable<any>
    {
        // return this._httpClient.get('api/common/shortcuts');
        return of({
            shortcuts: []
        });
    }

    /**
     * Load user
     *
     * @private
     */
    private _loadUser(): Observable<any>
    {
        // return this._httpClient.get('api/common/user');
        return of({
            user: null
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return forkJoin([

            // Messages
            this._loadMessages(),

            // Navigation data
            this._loadNavigation(),

            // Notifications
            this._loadNotifications(),

            // Shortcuts
            this._loadShortcuts(),

            // User
            // this._loadUser()
        ]).pipe(
            map((data) => {

                return {
                    messages     : data[0].messages,
                    navigation   : {
                        compact   : data[1].compact,
                        default   : data[1].default,
                        futuristic: data[1].futuristic,
                        horizontal: data[1].horizontal
                    },
                    notifications: data[2].notifications,
                    shortcuts    : data[3].shortcuts,
                    user         : {}
                };
            })
        );
    }
}

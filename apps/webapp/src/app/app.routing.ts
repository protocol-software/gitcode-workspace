import { Route } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { EmptyLayoutComponent } from './layout/layouts/empty/empty.component';
import { InitialDataResolver } from './app.resolvers';
import {BasicLayoutComponent} from './layout/layouts/basic/basic.component';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
    { path: '', pathMatch : 'full', redirectTo: 'home' },
    { path: 'settings', pathMatch : 'full', redirectTo: 'settings/profile' },

    {
        path: '',
        canActivate: [NoAuthGuard], canActivateChild: [NoAuthGuard],
        component  : BasicLayoutComponent, resolve    : { initialData: InitialDataResolver },
        children: [
            // landing routes
            { path: 'home', loadChildren: () => import('./modules/landing/home/home.module').then(m => m.LandingHomeModule) },
            { path: 'how-it-works', loadChildren: () => import('./modules/landing/how-it-works/how-it-works.module').then(m => m.HowItWorksModule) },

            // app routes
            {
                path: 'code-review',
                children: [
                    { path: 'public', loadChildren: () => import('./modules/app/code-review/public-code-review/public-code-review.module').then(m => m.PublicCodeReviewModule) },
                    { path: 'private', loadChildren: () => import('./modules/app/code-review/private-code-review/private-code-review.module').then(m => m.PrivateCodeReviewModule) },
                ]
            },
            {
                path: 'snack-code',
                children: [
                    { path: '', loadChildren: () => import('./modules/app/snack-code/snack-code.module').then(m => m.SnackCodeModule) },
                    { path: ':categoryItems', loadChildren: () => import('./modules/app/snack-code/snack-code.module').then(m => m.SnackCodeModule) },
                    { path: 'detail/:id', loadChildren: () => import('./modules/app/snack-code/detail/detail.module').then(m => m.DetailModule) }
                ]
            },
            {
                path: 'search-code',
                children: [
                    { path: '', loadChildren: () => import('./modules/app/search-code/search-code.module').then(m => m.SearchCodeModule) },
                    { path: 'search/:query', loadChildren: () => import('./modules/app/search-code/result/result.module').then(m => m.ResultModule) }
                ]
            },
            {
                path: 'settings',
                canActivate: [NoAuthGuard], canActivateChild: [NoAuthGuard],
                children: [
                    { path: ':activePath', loadChildren: () => import('./modules/app/settings/settings.module').then(m => m.SettingsModule) },
                ]
            }
        ]
    },
];

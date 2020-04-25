import { Route } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';
import { EmptyLayoutComponent } from './layout/layouts/empty/empty.component';
import { InitialDataResolver } from './app.resolvers';
import {ModernLayoutComponent} from './layout/layouts/horizontal/modern/modern.component';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
    {path: '', pathMatch : 'full', redirectTo: 'home'},

    // Redirect signed in user to the '/example'
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'customer'},

    // Auth routes
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: EmptyLayoutComponent,
        children: [
            {path: 'confirmation-required', loadChildren: () => import('./modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('./modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('./modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: EmptyLayoutComponent,
        children: [
            {path: 'sign-out', loadChildren: () => import('./modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('./modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component  : ModernLayoutComponent,
        children   : [
            {path: 'home', loadChildren: () => import('./modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component  : ModernLayoutComponent,
        children   : [
            {path: 'how-it-works', loadChildren: () => import('./modules/landing/how-it-works/how-it-works.module').then(m => m.HowItWorksModule)},
        ]
    },

    // app routes
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component  : ModernLayoutComponent,
        children   : [
            {path: 'public-code-review', loadChildren: () => import('./modules/app/code-review/public-code-review/public-code-review.module').then(m => m.PublicCodeReviewModule)},
        ]
    },
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component  : ModernLayoutComponent,
        children   : [
            {path: 'private-code-review', loadChildren: () => import('./modules/app/code-review/private-code-review/private-code-review.module').then(m => m.PrivateCodeReviewModule)},
        ]
    },
];

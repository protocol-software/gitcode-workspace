import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { TreoModule } from '../@treo';
import { TreoConfigModule } from '../@treo/services/config';

import { CoreModule } from './core/core.module';
import { appConfig } from './core/config/app.config';

import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {SignUpDialogModule} from './shared/sign-up-dialog/sign-up-dialog.module';
import {TermsDialogModule} from './shared/terms-dialog/terms-dialog.module';
import {PolicyDialogModule} from './shared/policy-dialog/policy-dialog.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {PaymentDialogModule} from "./shared/payment-dialog/payment-dialog.module";
import {PaginationModule} from "./shared/pagination/pagination.module";

const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy       : PreloadAllModules
};

export function createTranslateLoader(http: HttpClient): any {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule,

        // Treo
        TreoModule,
        TreoConfigModule.forRoot(appConfig),

        // Core
        CoreModule,

        // Layout
        LayoutModule,

        // 3rd party modules
        MarkdownModule.forRoot({}),

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),

        SignUpDialogModule,
        TermsDialogModule,
        PolicyDialogModule,
        PaymentDialogModule,
        PaginationModule,

    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}

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


const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy       : PreloadAllModules
};

export function createTranslateLoader(http: HttpClient) {
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

        // Treo & Treo Mock API
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



    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}

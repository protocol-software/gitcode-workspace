import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { UiModule } from '@gitcode/ui';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';
import { TreoModule } from '../@treo';
import { TreoConfigModule } from '../@treo/services/config';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { appConfig } from './core/config/app.config';

import { CoreModule } from './core/core.module';

import { LayoutModule } from './layout/layout.module';
import { PaginationModule } from './shared/pagination/pagination.module';

import { PaymentDialogModule } from './shared/payment-dialog/payment-dialog.module';
import { PolicyDialogModule } from './shared/policy-dialog/policy-dialog.module';
import { SignUpDialogModule } from './shared/sign-up-dialog/sign-up-dialog.module';
import { TermsDialogModule } from './shared/terms-dialog/terms-dialog.module';

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules,
};

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
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
        deps: [HttpClient],
      },
    }),

    SignUpDialogModule,
    TermsDialogModule,
    PolicyDialogModule,
    PaymentDialogModule,
    PaginationModule,

    UiModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}

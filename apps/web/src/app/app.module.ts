import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UiModule } from '@re-code-io/ui';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ApplyRevieweeComponent } from './apply-reviewee/apply-reviewee.component';
import { ApplyReviewerComponent } from './apply-reviewer/apply-reviewer.component';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { HomeComponent } from './home/home.component';
import { MypagePublicPRComponent } from './mypage_public_pr/mypage_public_pr.component';
import { LoginComponent } from './login/login.component';
import { LogoutResolver } from './logout/logout.resolver';
import { RegisterComponent } from './register/register.component';
import { LaunchSubscriptionModule } from './shared/launch-subscription/launch-subscription.module';
import { UserModule } from './user/user.module';
import { UserResolver } from './user/user.resolver';
// import { FlexLayoutModule } from "@angular/flex-layout";
import { InboxMessageModule } from './inbox-message/inbox-message.module';
import { SignUpDialogModule } from './sign-up-dialog/sign-up-dialog.module';
// import { StarratingComponent } from './home/starrating/starrating.component';
import { RouterModule, Routes } from '@angular/router';
import { RequestClaimComponent } from './request-claim/request-claim.component';
import { RequestClaimDialogComponent } from './request-claim/request-claim-dialog/request-claim.dialog.component';
import { CompleteClaimDialogComponent } from './request-claim/complete-claim-dialog/complete-claim.dialog.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ApplyRevieweeComponent,
    ApplyReviewerComponent,
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    BrowserAnimationsModule, // imports firebase/auth, only needed for auth features
    MatDialogModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    
    LaunchSubscriptionModule,
    UserModule,
    MatMenuModule,
    MatToolbarModule,
    
    MatSidenavModule,
    MatListModule,
    // FlexLayoutModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    InboxMessageModule,
    SignUpDialogModule,
    UiModule
  ],
  // exports:[StarratingComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    AuthGuard,
    AuthService,
    LogoutResolver,
    UserResolver,
    UserService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

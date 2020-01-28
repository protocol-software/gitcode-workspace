import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DialogModule } from './dialog/dialog.module';
import { LanguageSelectorModule } from './language-selector/language-selector.module';
import { ContactUsService } from './services/contact-us.service';
import { FirebaseHelperService } from './services/firebase-helper.service';
import { GitHubService } from './services/github.service';
import { ImageService } from './services/image.service';
import { InboxService } from './services/inbox.service';
import { LaunchSubscriptionService } from './services/launch-subscription.service';
import { PaymentHistoryService } from './services/payment-history.service';
import { PromotionalCodeUsageService } from './services/promotional-code-usage.service';
import { PromotionalCodeService } from './services/promotional-code.service';
import { UserService } from './services/user.service';
import { UtilityService } from './services/utility.service';

@NgModule({
  imports: [
    // Angular modules
    CommonModule,
    HttpClientModule,

    // Third-party modules
    // Import AngularFireModule.initializeApp(environment.firebase) in each project.
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,

    // Custom modules
    DialogModule,
    LanguageSelectorModule,
  ],
  providers: [
    ContactUsService,
    FirebaseHelperService,
    GitHubService,
    ImageService,
    InboxService,
    LaunchSubscriptionService,
    PaymentHistoryService,
    PromotionalCodeService,
    PromotionalCodeUsageService,
    UserService,
    UtilityService,
  ],
  exports: [
    LanguageSelectorModule,
  ],
})
export class UiModule {}

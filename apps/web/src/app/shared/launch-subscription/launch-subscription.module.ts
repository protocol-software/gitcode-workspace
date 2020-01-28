import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
} from '@angular/material';
import { LaunchSubscriptionService, UiModule } from '@re-code-io/ui';
import { environment } from '../../../environments/environment';
import { LaunchSubscriptionComponent } from './launch-subscription.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    UiModule,
  ],
  declarations: [LaunchSubscriptionComponent],
  providers: [
    LaunchSubscriptionService,
  ],
  exports: [LaunchSubscriptionComponent],
})
export class LaunchSubscriptionModule {}

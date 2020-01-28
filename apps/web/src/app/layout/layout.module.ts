import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@re-code-io/ui';
import { InboxMessageModule } from '../inbox-message/inbox-message.module';
import { SignUpDialogModule } from '../sign-up-dialog/sign-up-dialog.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    TranslateModule,

    InboxMessageModule,
    SignUpDialogModule,
    UiModule,
  ],
  declarations: [LayoutComponent],
  providers: [],
  exports: [LayoutComponent],
})
export class LayoutModule {}

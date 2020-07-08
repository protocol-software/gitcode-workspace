import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from 'ngx-clipboard';
import { ButtonComponent } from './buttons/regular/button.component';
import { SnackCopyButtonComponent } from './buttons/snack-copy/snack-copy-button.component';
import { CodeReviewItemComponent } from './code-review/code-review-item/code-review-item.component';
import { CodeReviewUsersComponent } from './code-review/code-review-users/code-review-users.component';
import { ColorsComponent } from './colors/colors.component';
import { LogoBadgeComponent } from './logos/badge/logo-badge.component';
import { LogoComponent } from './logos/regular/logo.component';
import { TagComponent } from './tags/regular/tag.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    ClipboardModule,
  ],
  declarations: [
    ButtonComponent,
    CodeReviewItemComponent,
    CodeReviewUsersComponent,
    ColorsComponent,
    LogoBadgeComponent,
    LogoComponent,
    SnackCopyButtonComponent,
    TagComponent,
  ],
  exports: [
    ButtonComponent,
    CodeReviewItemComponent,
    CodeReviewUsersComponent,
    LogoBadgeComponent,
    LogoComponent,
    SnackCopyButtonComponent,
    TagComponent,
  ],
})
export class UiModule {}

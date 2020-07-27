import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { MomentModule } from 'ngx-moment';
import { ButtonComponent } from './buttons/regular/button.component';
import { SnackCopyButtonComponent } from './buttons/snack-copy/snack-copy-button.component';
import { CodeReviewCommentComponent } from './code-review/code-review-comment/code-review-comment.component';
import { CodeReviewItemComponent } from './code-review/code-review-item/code-review-item.component';
import { CodeReviewUsersComponent } from './code-review/code-review-users/code-review-users.component';
import { RateRevieweeDialogComponent } from './code-review/rate-reviewee/dialog/rate-reviewee-dialog.component';
import { RateRevieweeFormComponent } from './code-review/rate-reviewee/form/rate-reviewee-form.component';
import { RateReviewerPrivateDialogComponent } from './code-review/rate-reviewer-private/dialog/rate-reviewer-private-dialog.component';
import { RateReviewerPrivateFormComponent } from './code-review/rate-reviewer-private/form/rate-reviewer-private-form.component';
import { RateReviewerPublicDialogComponent } from './code-review/rate-reviewer-public/dialog/rate-reviewer-public-dialog.component';
import { RateReviewerPublicFormComponent } from './code-review/rate-reviewer-public/form/rate-reviewer-public-form.component';
import { ColorsComponent } from './colors/colors.component';
import { AlertDialogComponent } from './dialogs/alert/alert-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm/confirm-dialog.component';
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
    TranslateModule,
    MomentModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ButtonComponent,
    CodeReviewCommentComponent,
    CodeReviewItemComponent,
    CodeReviewUsersComponent,
    ColorsComponent,
    LogoBadgeComponent,
    LogoComponent,
    SnackCopyButtonComponent,
    TagComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    RateReviewerPublicFormComponent,
    RateReviewerPublicDialogComponent,
    RateReviewerPrivateFormComponent,
    RateReviewerPrivateDialogComponent,
    RateRevieweeFormComponent,
    RateRevieweeDialogComponent,
  ],
  exports: [
    ButtonComponent,
    CodeReviewCommentComponent,
    CodeReviewItemComponent,
    CodeReviewUsersComponent,
    LogoBadgeComponent,
    LogoComponent,
    SnackCopyButtonComponent,
    TagComponent,
  ],
})
export class UiModule {}

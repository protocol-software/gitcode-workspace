import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';
import { ButtonComponent } from './buttons/regular/button.component';
import { SnackCopyButtonComponent } from './buttons/snack-copy/snack-copy-button.component';
import { ColorsComponent } from './colors/colors.component';
import { LogoBadgeComponent } from './logos/badge/logo-badge.component';
import { LogoComponent } from './logos/regular/logo.component';
import { TagComponent } from './tags/regular/tag.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    ClipboardModule,
  ],
  declarations: [
    ButtonComponent,
    ColorsComponent,
    LogoBadgeComponent,
    LogoComponent,
    SnackCopyButtonComponent,
    TagComponent,
  ],
  exports: [
    ButtonComponent,
    LogoBadgeComponent,
    LogoComponent,
    SnackCopyButtonComponent,
    TagComponent,
  ],
})
export class UiModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './language-selector.component';
import { LanguageService } from './language.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule,
  ],
  declarations: [LanguageSelectorComponent],
  providers: [LanguageService],
  exports: [LanguageSelectorComponent],
})
export class LanguageSelectorModule {}

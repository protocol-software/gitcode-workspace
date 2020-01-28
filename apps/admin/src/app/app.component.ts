import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../config/app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.initializeTranslation();
  }

  private initializeTranslation(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang(AppConfig.defaultLang || 'en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use(AppConfig.defaultLang || 'en');
    // this.globalDataService.setCurrentLanguage(AppConfig.defaultLang || 'en');
  }
}

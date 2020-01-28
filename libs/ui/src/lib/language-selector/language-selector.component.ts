import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILanguageSelectorItem } from '@re-code-io/data';
import { distinctUntilChanged } from 'rxjs/operators';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'language-selector';

  @Input() public availableLanguages: ILanguageSelectorItem[];
  @Input() public selectedLanguageCode: string;

  public selectedLanguage: ILanguageSelectorItem;

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
  ) {
    this.languageService.currentLanguage$
        .pipe(
          distinctUntilChanged(),
        )
        .subscribe(
          (lang) => {
            if (!lang) {
              return;
            }

            this.setSelectedLanguage(lang);
          },
        );
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onAvailableLanguagesChanges(changes['availableLanguages']);
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  private onAvailableLanguagesChanges(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    this.availableLanguages.map(
      (langItem) => {
        langItem.languageText = this.translateService.instant(`languageSelector.${langItem.languageCode}`);
        return langItem;
      },
    );

    if (this.selectedLanguageCode) {
      this.setSelectedLanguage(this.selectedLanguageCode);
    }
  }

  private setSelectedLanguage(languageCode: string): void {
    if (!this.availableLanguages || !this.availableLanguages.length) {
      return;
    }

    this.selectedLanguage = this.availableLanguages.find(langItem => langItem.languageCode === languageCode);
  }

  public changeLanguage(languageCode: string) {
    this.languageService.CurrentLanguage = languageCode;
  }
}

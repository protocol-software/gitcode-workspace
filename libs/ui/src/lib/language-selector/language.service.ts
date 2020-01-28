import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public currentLanguage$: BehaviorSubject<string> = new BehaviorSubject<string>('en');

  public set CurrentLanguage(value: string) {
    this.currentLanguage$.next(value);
    localStorage.setItem('language', value);
    this.translateService.use(value);
  }

  public get CurrentLanguage(): string {
    return this.currentLanguage$.getValue();
  }

  constructor(private translateService: TranslateService) {
  }
}

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
                        .catch(err => console.error(err));

// begin-favicon dark light mode
function setupIcons(): void {
  const lightSchemeIcon = document.querySelector('link#light-scheme-icon');
  const darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

  function setLight(): void {
    document.head.append(lightSchemeIcon);
    darkSchemeIcon.remove();
  }

  function setDark(): void {
    lightSchemeIcon.remove();
    document.head.append(darkSchemeIcon);
  }


  const matcher = window.matchMedia('(prefers-color-scheme:dark)');

  function onUpdate(): void {
    if (matcher.matches) {
      setDark();
    } else {
      setLight();
    }
  }

  matcher.addListener(onUpdate);
  onUpdate();
}

setupIcons();

// end-favicon dark light mode

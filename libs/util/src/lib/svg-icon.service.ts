import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SvgIconService {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
  ) {
  }

  public registerIcon(name: string, url: string): void {
    this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(url));
  }
}

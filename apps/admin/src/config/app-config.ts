import { Direction } from '@angular/cdk/bidi';
import { DialogRole } from '@angular/material/dialog';

export const AppConfig = {
  defaultLang: 'en',
  breakpoints: {
    small: '31.25rem', // '25.6875rem',
    medium: '63.9375rem',
    large: '74.9375rem',
    extraLarge: '90rem',
  },
  dialog: {
    config: {
      autoFocus: false,
      // backdropClass: 'cdk-overlay-dark-backdrop',
      closeOnNavigation: true,
      direction: <Direction>'ltr',
      disableClose: true,
      hasBackdrop: true,
      height: '100vh',
      // minHeight: '100vh',
      maxHeight: '100%',
      width: '100vw',
      // minWidth: '23.5375rem',
      maxWidth: '100vw',
      panelClass: ['app-dialog'],
      // position: <DialogPosition>'bottom',
      restoreFocus: false,
      role: <DialogRole>'dialog',
    },
  },
};

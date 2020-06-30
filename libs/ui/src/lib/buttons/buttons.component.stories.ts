import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { radios, select, text } from '@storybook/addon-knobs';
import { ClipboardModule } from 'ngx-clipboard';
import { ButtonComponent } from './regular/button.component';
import { SnackCopyButtonComponent } from './snack-copy/snack-copy-button.component';

export default {
  title: 'Buttons',
};

export const regular = () => ({
  moduleMetadata: {
    imports: [
      HttpClientModule,
      MatIconModule,
    ],
    declarations: [ButtonComponent],
  },
  component: ButtonComponent,
  template: `<gitcode-button [color]='color' 
                             [size]='size' 
                             [icon]='icon'
                             [align]='align'
                             [direction]='direction'
                             (click)='onClicked($event)'>{{ text }}</gitcode-button>`,
  props: {
    text: text('text', 'Button'),
    color: select('color', ['primary', 'outline', 'outline-gray', 'gray', 'github'], 'primary'),
    size: radios('size', { small: 'small', medium: 'medium', large: 'large' }, 'medium'),
    icon: text('icon', 'search'),
    align: radios('align', { horizontal: 'horizontal', vertical: 'vertical' }, 'horizontal'),
    direction: radios('direction', { default: 'default', reverse: 'reverse' }, 'default'),
    onClicked: (event) => {
      console.log('button clicked!');
    },
  },
});


export const snackCopy = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      HttpClientModule,
      MatIconModule,
      ClipboardModule,
    ],
    declarations: [SnackCopyButtonComponent],
  },
  component: [SnackCopyButtonComponent],
  template: `<gitcode-snack-copy-button [content]='content'></gitcode-snack-copy-button>`,
  props: {
    content: text('content', 'This is copied text.'),
  },
});

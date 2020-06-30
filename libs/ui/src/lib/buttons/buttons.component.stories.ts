import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { radios, select, text } from '@storybook/addon-knobs';
import { ButtonComponent } from './regular/button.component';

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

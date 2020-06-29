import { radios, select, text } from '@storybook/addon-knobs';
import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
};

export const withText = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [ButtonComponent],
  },
  component: ButtonComponent,
  template: `<gitcode-button [color]='color' 
                             [size]='size' 
                             (click)='onClicked($event)'>{{ text }}</gitcode-button>`,
  props: {
    text: text('text', 'Primary Button!'),
    color: select('color', ['primary', 'outline', 'gray', 'git', 'snack'], 'primary'),
    size: radios('size', { small: 'small', medium: 'medium', large: 'large' }, 'medium'),
    onClicked: (event) => {
      console.log('button clicked!');
    },
  },
});

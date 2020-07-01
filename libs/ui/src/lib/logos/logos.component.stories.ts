import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { radios, select } from '@storybook/addon-knobs';
import { LogoComponent } from './regular/logo.component';

export default {
  title: 'Logos',
};

export const regular = () => ({
  moduleMetadata: {
    imports: [
      HttpClientModule,
      MatIconModule,
    ],
    declarations: [LogoComponent],
  },
  component: LogoComponent,
  template: `<gitcode-logo [color]='color' 
                           [size]='size' 
                           [variant]='variant'></gitcode-logo>`,
  props: {
    variant: radios('variant', { icon: 'icon', full: 'full', button: 'button' }, 'icon'),
    color: select('color', ['black', 'white', 'charcoal', 'yellow', 'pink', 'green', 'blue'], 'black'),
    size: radios('size', { small: 'small', medium: 'medium', large: 'large' }, 'medium'),
  },
});

import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters, configure } from '@storybook/angular';

addDecorator(withKnobs);
addDecorator(withA11y);
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
configure(require.context('../src/lib', true, /\.stories\.(j|t)sx?$/), module);

import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters, configure } from '@storybook/angular';

addDecorator(withKnobs);
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
configure(require.context('../src/lib', true, /\.stories\.(j|t)sx?$/), module);

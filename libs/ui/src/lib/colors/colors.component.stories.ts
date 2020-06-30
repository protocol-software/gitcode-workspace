import { ColorsComponent } from './colors.component';

export default {
  title: 'Colors',
};

export const palettes = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [ColorsComponent],
  },
  component: ColorsComponent,
});

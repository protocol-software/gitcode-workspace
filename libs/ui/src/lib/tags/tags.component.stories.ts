import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { radios, select, text } from '@storybook/addon-knobs';
import { TagComponent } from './regular/tag.component';

export default {
  title: 'Tags',
};

export const regular = () => ({
  moduleMetadata: {
    imports: [
      CommonModule,
      HttpClientModule,
      MatIconModule,
    ],
    declarations: [TagComponent],
  },
  component: TagComponent,
  template: `<gitcode-tag [type]='type' 
                           [shouldAllowDismiss]='shouldAllowDismiss'>{{ text }}</gitcode-tag>`,
  props: {
    text: text('text', 'Awesome Tag'),
    type: select(
      'type',
      ['none', 'open', 'reviewing', 'reopen', 'closed', 'matching', 'matched', 'best', 'grade'],
      'none'),
    shouldAllowDismiss: radios('Should Allow Dismiss', { true: 'true', false: 'false' }, 'false'),
  },
});

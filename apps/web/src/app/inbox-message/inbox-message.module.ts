import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UiModule } from '@re-code-io/ui';
import { MomentModule } from 'ngx-moment';
import { InboxMessageComponent } from './inbox-message.component';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    UiModule,
    MatIconModule,
  ],
  declarations: [InboxMessageComponent],
  providers: [],
  exports: [InboxMessageComponent],
})
export class InboxMessageModule {}

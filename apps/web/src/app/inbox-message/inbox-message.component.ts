import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IInboxMessage, IUser } from '@re-code-io/data';
import { InboxService } from '@re-code-io/ui';

@Component({
  selector: 'app-inbox-message',
  templateUrl: './inbox-message.component.html',
  styleUrls: ['./inbox-message.component.scss'],
})
export class InboxMessageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'inbox-message light-theme';

  @Input() public inboxMessage: IInboxMessage;
  @Input() public user: IUser;

  constructor(private inboxService: InboxService) {
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public markAsRead(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.inboxMessage.isRead) {
      return;
    }

    this.inboxMessage.isRead = true;
    this.inboxService.markAsRead(this.user.uid, this.inboxMessage.id);
  }

  public deleteMessage(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.inboxService.deleteMessage(this.user.uid, this.inboxMessage.id);
  }
}

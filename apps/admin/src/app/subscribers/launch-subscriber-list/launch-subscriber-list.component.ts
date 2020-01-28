import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ILaunchSubscriber, IPagination } from '@re-code-io/data';
import * as _ from 'lodash';

@Component({
  selector: 'app-subscriber-list',
  templateUrl: './launch-subscriber-list.component.html',
  styleUrls: ['./launch-subscriber-list.component.scss'],
})
export class LaunchSubscriberListComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'subscriber-list';

  @Input() public subscribers: ILaunchSubscriber[];
  @Input() public pagination: IPagination;
  @Output() public subscribersSelected: EventEmitter<ILaunchSubscriber[]> = new EventEmitter<ILaunchSubscriber[]>();
  @Output() public pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.onSubscribersChanges(changes['subscribers']);
  }

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  private onSubscribersChanges(change: SimpleChange): void {
    if (!change || !change.currentValue) {
      return;
    }

    this.subscribers = _.orderBy(change.currentValue, ['registerDate', 'desc']);
    this.pagination.totalItems = this.subscribers.length;
  }

  public selectAllSubscribers(event): void {
    this.subscribers = this.subscribers.map(
      (subscriber) => {
        subscriber.isSelected = event.checked;
        return subscriber;
      });

    this.emitSelectedSubscribers();
  }

  public selectSubscriber(event, subscriber: ILaunchSubscriber): void {
    subscriber.isSelected = event.checked;
    this.emitSelectedSubscribers();
  }

  private emitSelectedSubscribers(): void {
    const selectedSubscribers = this.subscribers.filter(subscriber => subscriber.isSelected);
    this.subscribersSelected.emit(selectedSubscribers);
  }

  public onPageChanged(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }
}

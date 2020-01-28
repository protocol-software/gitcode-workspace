import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ILaunchSubscriber, IPagination, IQueryParams } from '@re-code-io/data';
import { DialogService, LaunchSubscriptionService, UtilityService } from '@re-code-io/ui';
import { Subscription } from 'rxjs';
import { ILaunchSubscriberFilter } from './interfaces/launch-subscriber-filter.interface';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss'],
})
export class SubscribersComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'subscribers light-theme';

  public formGroup: FormGroup;
  public originalLaunchSubscribers: ILaunchSubscriber[];
  public launchSubscribers: ILaunchSubscriber[];
  public launchSubscribersPagination: IPagination;
  public shouldResetFilter = false;

  private selectedLaunchSubscribers: ILaunchSubscriber[];

  private getSubscribersSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private launchSubscriptionService: LaunchSubscriptionService,
    private dialogService: DialogService,
  ) {
    const prefetch = this.route.snapshot.data.prefetch;
    if (prefetch) {
      if (prefetch.subscribers) {
        this.originalLaunchSubscribers = prefetch.subscribers.filter(subscriber => !!subscriber.email);
        this.launchSubscribers = prefetch.subscribers.filter(subscriber => !!subscriber.email);
        this.launchSubscribersPagination = {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: this.launchSubscribers.length,
        };
      }
    }

    this.formGroup = this.formBuilder.group({
      // TODO: add form elements.
      sampleInput: ['', Validators.compose([Validators.required])],
    });
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {
    UtilityService.clearSubscriptions([
      this.getSubscribersSubscription,
    ]);
  }

  public ngAfterViewInit(): void {}

  public onFormSubmit(event, formValue) {
    event.preventDefault();
    event.stopPropagation();

    // TODO: call API with form value.
    console.log('form submit');
  }

  public onSubscribersSelected(subscribers: ILaunchSubscriber[]): void {
    this.selectedLaunchSubscribers = subscribers;
  }

  public onPageChanged(pageNumber: number): void {
    this.launchSubscribersPagination.currentPage = pageNumber;
    // this.loadSubscribers();
  }

  private loadSubscribers(): void {
    const params: IQueryParams = {
      orderBy: 'email',
      // pagination: this.launchSubscribersPagination,
    };

    this.shouldResetFilter = false;
    UtilityService.clearSubscriptions([this.getSubscribersSubscription]);
    this.getSubscribersSubscription = this.launchSubscriptionService.getSubscribers()
                                          .subscribe(
                                            res => this.handleGetSubscribersSuccess(res),
                                            err => this.handleGetSubscribersFailure(err),
                                          );
  }

  private handleGetSubscribersSuccess(res): void {
    this.originalLaunchSubscribers = res;
    this.launchSubscribers = res;
    this.shouldResetFilter = true;
  }

  private handleGetSubscribersFailure(err): void {
    console.error(err);
  }

  public onLaunchSubscriberFilterChanged(filter: ILaunchSubscriberFilter) {
    let filteredSubscribers: ILaunchSubscriber[] = this.originalLaunchSubscribers;
    if (filter.teamSizes && filter.teamSizes.length) {
      filteredSubscribers = filteredSubscribers.filter(item => filter.teamSizes.includes(item.teamSize));
    }

    if (filter.purposes && filter.purposes.length) {
      filter.purposes.forEach(
        (purpose) => {
          filteredSubscribers = filteredSubscribers.filter(item => item.purposes.includes(purpose));
        },
      );
    }

    if (filter.keyword && filter.keyword.trim()) {
      filteredSubscribers = filteredSubscribers.filter(item => item.email.includes(filter.keyword));
    }

    this.launchSubscribers = filteredSubscribers;
    this.launchSubscribersPagination.currentPage = 1;
    this.launchSubscribersPagination.totalItems = this.launchSubscribers.length;
  }

  public onLaunchSubscribersDeleteRequested(shouldDelete: boolean) {
    if (!shouldDelete) {
      return;
    }

    const selectedLaunchSubscribers = this.launchSubscribers.filter(subscriber => subscriber.isSelected);
    if (!selectedLaunchSubscribers || !selectedLaunchSubscribers.length) {
      return;
    }

    const dialogClosed = this.dialogService.confirm(
      `Delete ${selectedLaunchSubscribers.length} Subscribers`,
      `This will delete the selected ${selectedLaunchSubscribers.length} subscribers. Are you sure you want to continue?`,
      '',
      'Yes',
      'No',
      '',
      'no',
    );

    dialogClosed.subscribe(
      (result) => {
        if (!result) {
          return;
        }

        for (const subscriber of selectedLaunchSubscribers) {
          this.launchSubscriptionService.deleteSubscriber(subscriber)
              .subscribe(
                (responses) => {
                  this.loadSubscribers();
                },
              );
        }

        // TODO: check why forkJoin doesn't complete.
        // this.launchSubscriptionService.deleteSubscribers(selectedLaunchSubscribers).subscribe(
        //   (responses) => {
        //     console.log(123);
        //     this.loadSubscribers();
        //   },
        // );
      },
    );
  }
}

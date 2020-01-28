import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPagination, IQueryParams } from '@re-code-io/data';
import { DialogService, UtilityService } from '@re-code-io/ui';
import { Subscription } from 'rxjs';
import { MystiquePageSubscriptionService } from './services/mystique-page-subscription.service';

import { UsersSource } from './mystique-page-sources/users.source';
import { PublicPRsSource } from './mystique-page-sources/purblic-pr.source';
import { AdminUsersSource } from './mystique-page-sources/admin-users.source';
import { PrivatePRsSource } from './mystique-page-sources/private-pr.source';
import { PaymentHistorySource } from './mystique-page-sources/payment-history.source';
import { GithubWebhookLogsSource } from './mystique-page-sources/github-webhook-log.source';

@Component({
  selector: 'app-mystique-page',
  templateUrl: './mystique-page.component.html',
  styleUrls: ['./mystique-page.component.scss'],
})
export class MystiqueComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'mystique-page light-theme';

  private currentPageSource: any;
  public pageName: string;
  public filterSource: any[];
  public listSource: any[];

  public formGroup: FormGroup;
  public originalDataList: any[];
  public dataList: any[];
  public dataListPagination: IPagination;
  public shouldResetFilter = false;

  private selectedDataList: any[];
  private dataListSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private mystiquePageSubscriptionService: MystiquePageSubscriptionService,
    private dialogService: DialogService,
  ) {
    this.pageName = this.router.url.split('/')[1].toLowerCase();
    switch(this.pageName) {
      case 'users':
        this.currentPageSource = new UsersSource();
        break;
      case 'admin-users':
        this.currentPageSource = new AdminUsersSource();
        break;
      case 'public-prs':
        this.currentPageSource = new PublicPRsSource();
        break;
      case 'private-prs':
        this.currentPageSource = new PrivatePRsSource();
        break;
      case 'payment-history':
        this.currentPageSource = new PaymentHistorySource();
        break;
      case 'github-webhook-logs':
        this.currentPageSource = new GithubWebhookLogsSource();
        break;
    }

    if(!this.currentPageSource) {
      console.error('not matched source.');
      return;
    }

    this.filterSource = this.currentPageSource.filter;
    this.listSource = this.currentPageSource.list;

    this.mystiquePageSubscriptionService.init(this.currentPageSource.collectionName);
    this.dataListSubscription = this.mystiquePageSubscriptionService.getDocuments().subscribe(
      data => { this.handleGetDocuments(null, data) },
      error => { this.handleGetDocuments(error, null) }
    );

    // this.formGroup = this.formBuilder.group({
    //   // TODO: add form elements.
    //   sampleInput: ['', Validators.compose([Validators.required])],
    // });
  }
  private handleGetDocuments(error: any, data: any[]): void {
    if(error) {
      console.error(error);
      return;
    }

    this.originalDataList = data;
    this.dataList = data;
    this.dataListPagination = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: this.dataList.length,
    };
    this.shouldResetFilter = true;
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {
    UtilityService.clearSubscriptions([
      this.dataListSubscription,
    ]);
  }

  public ngAfterViewInit(): void {}

  // public onFormSubmit(event, formValue) {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   // TODO: call API with form value.
  //   console.log('form submit');
  // }

  public onDataSelected(data: any[]): void {
    this.selectedDataList = data;
  }

  public onPageChanged(pageNumber: number): void {
    this.dataListPagination.currentPage = pageNumber;
  }

  private loadDataList(): void {
    const params: IQueryParams = {
      orderBy: 'email',
      // pagination: this.launchSubscribersPagination,
    };

    this.shouldResetFilter = false;
    UtilityService.clearSubscriptions([this.dataListSubscription]);
    this.dataListSubscription = this.mystiquePageSubscriptionService.getDocuments().subscribe(
      data => this.handleGetDocuments(null, data),
      error => this.handleGetDocuments(error, null),
    );
  }

  public onFilterChanged(filter: any) {
    let filteredDataList: any[] = this.originalDataList;

    const filterKeys = Object.keys(filter);

    if(filterKeys.length > 0) {
      filteredDataList = filteredDataList.filter(item => {
        let hasData = false;

        filterKeys.forEach(filterKey => {
          const value = item[filterKey];
          if(!value) return;

          hasData = filter[filterKey].includes(value);
        });

        return hasData;
      });
    }

    this.dataList = filteredDataList;
    this.dataListPagination.currentPage = 1;
    this.dataListPagination.totalItems = this.dataList.length;
  }

  public onDeleteRequested(shouldDelete: boolean) {
    if (!shouldDelete) {
      return;
    }

    const selectedDataList = this.dataList.filter(subscriber => subscriber.isSelected);
    if (!selectedDataList || !selectedDataList.length) {
      window.alert('Please select item(s) to delete.')
      return;
    }

    const dialogClosed = this.dialogService.confirm(
      `Delete ${selectedDataList.length} Subscribers`,
      `This will delete the selected ${selectedDataList.length} subscribers. Are you sure you want to continue?`,
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

        for (const data of selectedDataList) {
          this.mystiquePageSubscriptionService.deleteDocument(data)
              .subscribe(
                (responses) => {
                  this.loadDataList();
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

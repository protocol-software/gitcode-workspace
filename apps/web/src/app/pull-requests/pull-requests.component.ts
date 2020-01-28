import { AfterViewInit, Component, HostBinding, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPullRequest } from '@re-code-io/data';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPullRequestFilter } from './pull-request-filter/pull-request-filter.interface';
import { PullRequestsService } from './pull-requests.service';

@Component({
  selector: 'app-pull-requests',
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.scss'],
})
export class PullRequestsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'pull-requests light-theme';

  public pullRequests: IPullRequest[];
  public pullRequests$: Observable<IPullRequest[]>;

  private searchFilter: IPullRequestFilter;

  constructor(
    private route: ActivatedRoute,
    private prService: PullRequestsService,
  ) {
    const prefetch = this.route.snapshot.data.prefetch;
    if (prefetch) {
      this.pullRequests = prefetch.pullRequests;
    }

    this.pullRequests$ = this.prService.getPullRequestsValueChanges()
                             .pipe(
                               map(
                                 (pullRequests) => {
                                   this.pullRequests = pullRequests;
                                   const orderedPullRequests = _.orderBy(pullRequests, ['updatedAt']);
                                   return this.filterPullRequests(orderedPullRequests);
                                 },
                               ),
                             );
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  private filterPullRequests(pullRequests: IPullRequest[]): IPullRequest[] {
    return pullRequests.filter((pullRequest) => {
      if (!this.searchFilter) {
        return true;
      }

      return Object.keys(this.searchFilter).reduce(
        (isMatched, key) => {
          if (!pullRequest.hasOwnProperty(key) && key !== 'keyword') {
            return true;
          }

          if (key !== 'keyword') {
            return isMatched && pullRequest[key] === this.searchFilter[key];
          }

          const regex = new RegExp(this.searchFilter[key], 'i');
          return isMatched && regex.test(pullRequest['title']);
        },
        true,
      );
    })
  }

  public onFilterChanged(filter: IPullRequestFilter) {
    this.searchFilter = filter;
    this.pullRequests$ = of(this.filterPullRequests(this.pullRequests));
  }
}

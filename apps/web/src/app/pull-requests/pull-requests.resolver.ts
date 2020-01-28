import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PullRequestsService } from './pull-requests.service';

@Injectable()
export class PullRequestsResolver implements Resolve<Observable<any>> {
  constructor(private pullRequestService: PullRequestsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const requests = [
      this.pullRequestService.getPullRequests({ orderBy: 'updatedAt' }),
    ];

    return forkJoin(requests).pipe(
      map(
        responses => (
          {
            pullRequests: responses[0],
          }
        ),
      ),
    );
  }
}

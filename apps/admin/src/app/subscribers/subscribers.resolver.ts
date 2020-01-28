import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IQueryParams } from '@re-code-io/data';
import { LaunchSubscriptionService } from '@re-code-io/ui';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SubscribersResolver implements Resolve<Observable<any>> {
  constructor(private subscriberService: LaunchSubscriptionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const getSubscribersQueryParams: IQueryParams = {
      orderBy: 'email',
    };

    const requests = [
      this.subscriberService.getSubscribers(getSubscribersQueryParams),
    ];

    return forkJoin(requests).pipe(
      map(
        responses => (
          {
            subscribers: responses[0],
          }
        ),
      ),
    );
  }
}

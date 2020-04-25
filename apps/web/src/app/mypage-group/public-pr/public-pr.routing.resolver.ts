import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PublicPrService } from './public-pr.routing.service';

@Injectable()
export class PublicPrResolver implements Resolve<Observable<any>> {
  constructor(private pullRequestService: PublicPrService) {
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

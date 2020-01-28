import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UserService } from '@re-code-io/ui';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersResolver implements Resolve<Observable<any>> {
  constructor(
    private userService: UserService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const requests = [
      this.userService.getUsers(),
    ];

    return forkJoin(requests).pipe(
      map(
        responses => (
          {
            users: responses[0],
          }
        ),
      ),
    );
  }
}

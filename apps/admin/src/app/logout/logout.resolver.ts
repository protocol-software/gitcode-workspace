import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@re-code-io/ui';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogoutResolver implements Resolve<Observable<any>> {
  constructor(
    @Inject('AuthService') private authService: AuthService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return from(this.authService.signOut()).pipe(
      tap(
        () => {
          this.router.navigate(['login']);
        },
      ),
    );
  }
}

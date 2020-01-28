import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@re-code-io/ui';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class LoginResolver implements Resolve<Observable<any>> {
  constructor(
    @Inject('AuthService') private authService: AuthService,
    private router: Router,
  ) {
    this.authService.user$.subscribe(
      (user) => {
        if (!user) {
          return;
        }

        // TODO: properly prevent a user from outside an organization from logging in.
        if (!user.email || !user.email.endsWith('@re-code.io')) {
          window.alert('Only those from re-code.io is allowed to sign in.');
          this.authService.signOut();
          return;
        }

        this.router.navigate(['users']);
      },
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return EMPTY;
  }
}

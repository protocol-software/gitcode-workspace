import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@re-code-io/ui';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    // public afAuth: AngularFireAuth,
    // public userService: UserService,
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['home']);
        }
      }),
    );

    // return new Promise((resolve, reject) => {
    //   this.userService.getCurrentUser()
    //   .then(user => {
    //     this.router.navigate(['/user']);
    //     return resolve(false);
    //   }, err => {
    //     return resolve(true);
    //   })
    // })
  }
}

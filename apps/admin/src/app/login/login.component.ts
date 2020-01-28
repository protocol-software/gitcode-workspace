import {
  AfterViewInit,
  Component,
  HostBinding,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthProvider } from '@re-code-io/data';
import { AuthService } from '@re-code-io/ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @HostBinding('class') public hostClass = 'login';

  constructor(
    private route: ActivatedRoute,
    @Inject('AuthService') private authService: AuthService,
  ) {
    const prefetch = this.route.snapshot.data.prefetch;
  }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public ngOnDestroy(): void {}

  public ngAfterViewInit(): void {}

  public login(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.authService.signInOAuth(OAuthProvider.GOOGLE);
  }
}

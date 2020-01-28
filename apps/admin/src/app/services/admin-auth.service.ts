import { Injectable } from '@angular/core';
import { AuthService } from '@re-code-io/ui';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService extends AuthService {
  protected collectionName = 'admins';
}

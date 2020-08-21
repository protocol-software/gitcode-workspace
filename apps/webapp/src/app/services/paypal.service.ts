import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPayPalToken } from '@gitcode/data';
import { Observable } from 'rxjs';
import * as UrlAssembler from 'url-assembler';
import { ApiEndpoint } from '../../../../../libs/data/src/lib/configurations/api-endpoint';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PayPalService {
  constructor(private http: HttpClient) {
  }

  public getToken(clientId: string, clientSecret: string): Observable<IPayPalToken> {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`,

      // Required for a form-data request.
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const httpParams = { headers };
    const endpoint = UrlAssembler(environment.payPal.baseApiUrl)
      .template(ApiEndpoint.payPal.getToken)
      .toString();

    // Set form data.
    const formData = new URLSearchParams();
    formData.set('grant_type', 'client_credentials');

    // Stringify form data.
    const body = formData.toString();

    return this.http.post<IPayPalToken>(endpoint, body, httpParams);
  }
}

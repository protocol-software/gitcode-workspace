import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPayPalProductRequest, IPayPalProductResponse, IPayPalToken } from '@gitcode/data';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    const cachedPayPalToken = localStorage.getItem('paypal-token');
    if (cachedPayPalToken) {
      return of(JSON.parse(cachedPayPalToken));
    }

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

    return this.http.post<IPayPalToken>(endpoint, body, httpParams)
               .pipe(
                 tap(
                   (response) => {
                     localStorage.setItem('paypal-token', JSON.stringify(response));
                     return response;
                   },
                 ),
               );
  }

  public createProduct(product: IPayPalProductRequest, payPalAccessToken: string): Observable<IPayPalProductResponse> {
    const endpoint = UrlAssembler(environment.payPal.baseApiUrl)
      .template(ApiEndpoint.payPal.createProduct)
      .toString();

    const headers = {
      'Authorization': `Bearer ${payPalAccessToken}`,
    };
    const httpParams = { headers };

    return this.http.post<IPayPalProductResponse>(endpoint, product, httpParams);
  }
}

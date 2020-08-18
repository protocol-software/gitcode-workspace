import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as UrlAssembler from 'url-assembler';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {
  }

  public convert(fromCurrency: string, toCurrency: string, amount: number): Observable<number> {
    const endpoint = UrlAssembler(environment.baseUrl.api)
      .template('/common/currency/:from/:to/:amount')
      .param({
        amount,
        from: fromCurrency,
        to: toCurrency,
      })
      .toString();

    return this.http.get<number>(endpoint);
  }
}

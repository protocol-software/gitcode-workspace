import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IPayPalPlanRequest,
  IPayPalPlanResponse,
  IPayPalProductRequest,
  IPayPalProductResponse,
  IPayPalSubscriptionRequest,
  IPaypalSubscriptionResponse,
  IPayPalToken,
} from '@gitcode/data';
import dayjs from 'dayjs';
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

  public createPlan(plan: IPayPalPlanRequest, payPalAccessToken: string): Observable<IPayPalPlanResponse> {
    const endpoint = UrlAssembler(environment.payPal.baseApiUrl)
      .template(ApiEndpoint.payPal.createPlan)
      .toString();

    const headers = {
      'Authorization': `Bearer ${payPalAccessToken}`,
      // 'Prefer': 'return=representation',
    };
    const httpParams = { headers };

    return this.http.post<IPayPalPlanResponse>(endpoint, plan, httpParams);
  }

  public generatePlan(product: IPayPalProductResponse, planData: any): IPayPalPlanRequest {
    // Generate plan from form data.
    // TODO: Review the plan esp. the 'setup_fee' and 'taxes' parts.
    return {
      product_id: product.id,
      name: product.name,
      description: product.description,
      billing_cycles: [
        {
          frequency: {
            interval_unit: 'MONTH',
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: planData.cycles,
          pricing_scheme: {
            fixed_price: {
              value: planData.unitPriceUSD.toString(),
              currency_code: 'USD',
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: '0',
          currency_code: 'USD',
        },
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3,
      },
      taxes: {
        percentage: '10',
        inclusive: false,
      },
    } as IPayPalPlanRequest;
  }

  public createSubscription(subscription: IPayPalSubscriptionRequest,
                            payPalAccessToken: string): Observable<IPaypalSubscriptionResponse> {
    const endpoint = UrlAssembler(environment.payPal.baseApiUrl)
      .template(ApiEndpoint.payPal.createSubscription)
      .toString();

    const headers = {
      'Authorization': `Bearer ${payPalAccessToken}`,
    };
    const httpParams = { headers };

    return this.http.post<IPaypalSubscriptionResponse>(endpoint, subscription, httpParams);
  }

  public generateSubscription(plan: IPayPalPlanResponse, planData: any): IPayPalSubscriptionRequest {
    // NOTE: localhost URL doesn't work for return_url and cancel_url.
    const redirectUrl = window.location.hostname === 'localhost'
                      ? 'https://example.com/redirectUrl'
                      : window.location.href;

    return {
      plan_id: plan.id,
      start_time: dayjs().endOf('month').toISOString(),
      quantity: '1',
      shipping_amount: {
        currency_code: 'USD',
        value: '0.00',
      },
      subscriber: {
        name: {
          given_name: planData.githubId,
        },
        email_address: planData.email,
        // shipping_address: {
        //   name: {
        //     full_name: user.displayName,
        //   },
        //   address: {
        //     address_line_1: "2211 N First Street",
        //     address_line_2: "Building 17",
        //     admin_area_2: "San Jose",
        //     admin_area_1: "CA",
        //     postal_code: "95131",
        //     country_code: "US"
        //   }
        // }
      },
      application_context: {
        brand_name: 'gitcode',
        locale: 'en-US',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        payment_method: {
          payer_selected: 'PAYPAL',
          payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
        },
        return_url: redirectUrl,
        cancel_url: redirectUrl,
      },
    } as IPayPalSubscriptionRequest;
  }
}

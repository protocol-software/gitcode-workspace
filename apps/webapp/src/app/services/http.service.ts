import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {

    }

    public get<T>(endpoint: string, headers?: any): Observable<T> {
        return this.http.get<T>(endpoint, headers)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return throwError(errorResponse);
                }),
            );
    }

    public post<T>(endpoint: string, payload: any, headers?: any): Observable<T> {
        return this.http.post<T>(endpoint, payload, headers)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return throwError(errorResponse);
                }),
            );
    }

    public delete<T>(endpoint: string, headers?: any): Observable<T> {
        return this.http.delete<T>(endpoint, headers)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return throwError(errorResponse);
                }),
            );
    }

    public put<T>(endpoint: string, payload, headers?: any): Observable<T> {
        return this.http.put<T>(endpoint, payload, headers)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return throwError(errorResponse);
                }),
            );
    }
}

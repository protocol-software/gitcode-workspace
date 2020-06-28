import { Observable, throwError } from 'rxjs';
import {HttpService} from './http.service';
import * as SafeUrlAssembler from 'url-assembler';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class OtpService {
    constructor(private httpService: HttpService) {

    }

    public sendOtpEmail<T>(data: any): Observable<T> {
        const endpoint = SafeUrlAssembler(environment.otp.sendOtpEmail)
            .toString();

        return this.httpService.post<any>(endpoint, data);
    }

    public verifyOtp<T>(data: any): Observable<T> {
        const endpoint = SafeUrlAssembler(environment.otp.verifyOtp)
            .toString();

        return this.httpService.post<any>(endpoint, data);
    }
}

import { Observable, throwError } from 'rxjs';
import {HttpService} from './http.service';
import * as SafeUrlAssembler from 'url-assembler';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {ApiEndpoint} from '../../../../../libs/data/src/lib/configurations/api-endpoint';

@Injectable({
    providedIn: 'root',
})
export class SnackCodeService {
    constructor(private httpService: HttpService) {

    }

    public getTags<T>(): Observable<T> {
        const endpoint = SafeUrlAssembler(ApiEndpoint.snackCode.getTags)
            .toString();

        return this.httpService.get<any>(endpoint);
    }

    public getContents<T>(data: any): Observable<T> {
        const endpoint = SafeUrlAssembler(ApiEndpoint.snackCode.getContents)
            .toString();

        return this.httpService.post<any>(endpoint, data);
    }
}

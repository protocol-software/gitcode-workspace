import { Observable, throwError } from 'rxjs';
import {HttpService} from './http.service';
import * as SafeUrlAssembler from 'url-assembler';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {ApiEndpoint} from '../../../../../libs/data/src/lib/configurations/api-endpoint';
import {ICodeContentItem, ICodeTag} from '@gitcode/data';

@Injectable({
    providedIn: 'root',
})
export class SnackCodeService {
    constructor(private httpService: HttpService) {

    }

    public getTags(): Observable<ICodeTag[]> {
        const endpoint = SafeUrlAssembler(environment.baseUrl.api)
            .template(ApiEndpoint.snackCode.getTags)
            .toString();

        return this.httpService.get<ICodeTag[]>(endpoint);
    }

    public getContents(payload: any): Observable<ICodeContentItem[]> {
        const endpoint = SafeUrlAssembler(environment.baseUrl.api)
            .template(ApiEndpoint.snackCode.getContents)
            .toString();

        return this.httpService.post<ICodeContentItem[]>(endpoint, payload);
    }
}

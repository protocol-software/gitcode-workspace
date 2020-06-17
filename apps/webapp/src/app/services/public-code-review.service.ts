import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {IUser} from "@gitcode/data";

@Injectable({
  providedIn: 'root'
})
export class PublicCodeReviewService {

    private urlPublicCodeReviewLists: string = "/assets/data/public-code-review-lists-data.json";
    private urlListStatuses: string = "/assets/data/list-statuses-data.json";
    public publicCodeReviewList : any = [] ;
    public statusList : any = [] ;

    constructor(
        private http: HttpClient,
    ) {
    }
    errorHandler(error: HttpErrorResponse){
        return Observable.throwError(error.message || "Server Error");
    }

    getPublicCodeReviewList(): Observable<IPublicCodeReviewList[]> {
        this.publicCodeReviewList = this.http.get<IPublicCodeReviewList[]>(this.urlPublicCodeReviewLists).catch(this.errorHandler);
        return this.publicCodeReviewList;
    }

    getStatusList(): Observable<IStatusList[]> {
        this.statusList = this.http.get<IStatusList[]>(this.urlListStatuses).catch(this.errorHandler);
        return this.statusList;
    }

}

@Pipe({ name: 'myPostFilter' })
export class MyPostFilterPipe implements PipeTransform {
        transform(contents: any[], isOnlyMyPR: boolean, uid:string)  {
            if(!contents) return [];

            if (isOnlyMyPR) {
                return contents.filter(contents => contents.author.uid === uid);
            } else {
                return contents.filter(contents => contents);
            }
        }
}

@Pipe({ name: 'statusFilter' })
export class StatusPipe implements PipeTransform {
    transform(contents: IPublicCodeReviewList[],isSelectedStatus) {
            if(!contents) return [];

            if (isSelectedStatus=="코드리뷰중") {
                return contents.filter(contents => contents.reviewStatus == "reviewing");
            }
            else if (isSelectedStatus=="종료") {
                return contents.filter(contents => contents.reviewStatus == "close");
            }
            else if (isSelectedStatus=="오픈") {
                return contents.filter(contents => contents.reviewStatus == "open");
            }
            else if (isSelectedStatus=="재오픈") {
                return contents.filter(contents => contents.reviewStatus == "re-open");
            } else {
                return contents.filter(contents => contents);
            }
    }
}
// TODO:spock multi checkbox filter
@Pipe({
    name: 'testFilter'
})
export class FilterPipe implements PipeTransform {
    transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
        return items.filter(item => {
            let notMatchingField = Object.keys(filter)
                .find(key => item[key] !== filter[key]);
            return !notMatchingField; // true if matches all fields
        });
    }
}

@Pipe({ name: 'langStatusFilter' })
export class LangStatusPipe implements PipeTransform {
    transform(contents: IStatusList[]){return contents.filter(contents => contents); }
}

export interface IPublicCodeReviewList {

    postId : number,
    contentTitle : string,
    reviewStatus : string,
    tags : [],
    name : string,
    author : {
        id : number,
        name : string,
        photoUrl : string
    },
    reviewers : [{
        id : number,
        name : string,
        photoUrl : string,
        isBestReviewer : boolean
    }
    ]
}

export interface IStatusList {
    key: number,
    value: string
}



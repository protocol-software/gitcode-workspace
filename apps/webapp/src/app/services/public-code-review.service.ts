import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch'

const myPostValue = "Lion"

@Injectable({
  providedIn: 'root'
})
export class PublicCodeReviewService {

    private urlPublicCodeReviewLists: string = "/assets/data/public-code-review-lists-data.json";
    public publicCodeReviewList : any = [] ;
    constructor(
        private http: HttpClient,
    ) {
    }
    errorHandler(error: HttpErrorResponse){
        return Observable.throwError(error.message || "Server Error");
    }

    getPublicCodeReviewList(): Observable<IPublicCodeReviewList[]> {
        this.publicCodeReviewList = this.http.get<IPublicCodeReviewList[]>(this.urlPublicCodeReviewLists).catch(this.errorHandler);
        console.log(this.publicCodeReviewList);
        return this.publicCodeReviewList;
    }

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
    lang : [{
        label: string,
        select:[]
    }]
}


@Pipe({ name: 'myPostFilter' })
export class MyPostFilterPipe implements PipeTransform {
        transform(contents: IPublicCodeReviewList[],isSelectedMyPost:boolean)  {
            if (isSelectedMyPost==true) {
                return contents.filter(contents => contents.author.name === myPostValue);
            } else {
                return contents.filter(contents => contents);
            }
        }

}


import { Component, HostBinding, OnInit } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ICodeReviewItem, IUser } from '@gitcode/data';
import { forkJoin, Observable } from 'rxjs';
import { map, retry, take } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'gitcode-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @HostBinding('class') public hostClass = 'settings';

  public user: IUser;
  public publicRepos: ICodeReviewItem[];
  public privateRepos: ICodeReviewItem[];

  activePath: string;

  constructor(route: ActivatedRoute,
              private authService: AuthService,
              private angularFirestore: AngularFirestore,
  ) {
    route.params.subscribe((params) => {
      this.activePath = params['activePath'];
    });

    this.authService.user$
        .subscribe((user: IUser) => {
          this.user = user;

          forkJoin([
            this.getRepositories(),
            this.getRepositories(false),
          ]).subscribe(
            (repos) => {
              this.publicRepos = repos[0];
              this.privateRepos = repos[1];
            },
          );
        });
  }

  ngOnInit(): void {
  }

  private getRepositories(isPublic = true): Observable<ICodeReviewItem[]> {
    const type = isPublic ? 'public' : 'private';
    const query: QueryFn = (ref) => ref
      .where('author.uid', '==', this.user?.uid);
    return this.angularFirestore
               .collection(`${type}-code-review`, query)
               .snapshotChanges()
               .pipe(
                 retry(2),
                 take(1),
                 map(docs => docs.map(doc => doc.payload.doc.data() as ICodeReviewItem)),
               );
  }
}

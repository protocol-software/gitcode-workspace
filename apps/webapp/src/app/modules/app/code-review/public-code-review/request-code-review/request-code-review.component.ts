import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {GitHubService} from "../../../../../services/github.service";
import {AuthService} from "../../../../../services/auth.service";
import {IGitHubBranch, IGitHubRepo, IUser} from "@gitcode/data";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";

@Component({
  selector: 'gitcode-request-code-review',
  templateUrl: './request-code-review.component.html',
  styleUrls: ['./request-code-review.component.scss']
})
export class RequestCodeReviewComponent implements OnInit {
  user: IUser;

  public formGroup: FormGroup;
  public isReviewRequestComplete = false;

  public ownerName: string;
  public personalPublicRepos = [];
  public branchesOnRepo = [];

  repoName: string = '';
  branchName: string = '';
  targetBranchName: string = '';

  proficiency: string;
  title: string;
  description: string;
  purpose: string;

  private creatingPR = false;

  constructor(
      public dialogRef: MatDialogRef<RequestCodeReviewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private gitHubService: GitHubService,
      private authService: AuthService,
      private angularFirestore: AngularFirestore,
  ) {
    this.formGroup = this.formBuilder.group({
      repoName: ['', Validators.compose([Validators.required])],
      branchName: ['', Validators.compose([Validators.required])],
      targetBranchName: ['', Validators.compose([Validators.required])],
      proficiency: [undefined, Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      purpose: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    // this.targetBranchName = `gitcode/pr-${(new Date()).getTime()}`;

    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.ownerName = this.user.providerUserData.github.login;

      this.gitHubService.getRepositories(this.ownerName).subscribe((result: IGitHubRepo[]) => {
        this.personalPublicRepos = result;
      });
    });
  }

  repoChanged(event): void {
    this.repoName = event.source.value;
    this.branchName = '';
    this.branchesOnRepo = [];

    if(this.repoName === '') {
      return;
    }

    this.gitHubService.getBranches(this.ownerName, this.repoName).subscribe((result: IGitHubBranch[]) => {
      this.branchesOnRepo = result;
    });
  }

  public async requestCreateReview(event) {
    if(this.creatingPR) return;

    this.formGroup.disable();
    this.creatingPR = true;
    // const ref = await this.gitHubService.getRef(this.ownerName, this.repoName, 'master');
    // await this.gitHubService.createBranch(this.ownerName, this.repoName, this.targetBranchName, ref.object.sha);

    const payload = {
      title: this.title,
      head: this.branchName,
      base: this.targetBranchName,
      body: `${this.description}\n\n${this.purpose}`,
      maintainer_can_modify: true,
      draft: false,
    };

    this.gitHubService.createPR(this.ownerName, this.repoName, payload)
        .subscribe((result: any) => {
          this.postPR(result);

          alert('PR이 생성되었습니다!');
          this.isReviewRequestComplete = true;
        },(error: any) => {
          alert(`PR 생성에 실패하였습니다.\n${error.statusText}`);
    }, () => {
          this.formGroup.enable();
          this.creatingPR = false;
    });
  }
  private postPR(prResponse: any): void {
    const doc = {
      title: this.title,
      proficiency: this.proficiency,
      description: this.description,
      purpose: this.purpose,
      author: this.user,
      reviewers: [],
      githubPR: prResponse,
      createdAt: new Date()
    };

    this.angularFirestore.collection('public-code-review').add(doc);
  }

  public closePopup(event) {
    this.dialogRef.close(true);
  }
}

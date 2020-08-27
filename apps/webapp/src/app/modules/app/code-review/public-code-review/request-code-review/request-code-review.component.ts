import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICodeReviewItem, IGitHubBranch, IGitHubRepo, IUser } from '@gitcode/data';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../services/auth.service';
import { GitHubService } from '../../../../../services/github.service';

@Component({
  selector: 'gitcode-request-code-review',
  templateUrl: './request-code-review.component.html',
  styleUrls: ['./request-code-review.component.scss'],
})
export class RequestCodeReviewComponent implements OnInit {
  user: IUser;

  public formGroup: FormGroup;
  public isReviewRequestComplete = false;

  public ownerName: string;
  public repos = [];
  public branches = [];

  repoName = '';
  branchName = '';
  targetBranchName = '';

  proficiency: string;
  title: string;
  description: string;
  purpose: string;

  public item: ICodeReviewItem;
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

    this.monitorValueChanges();

    this.item = this.data?.codeReviewItem;
    if (this.item && Object.keys(this.item).length > 0) {
      this.formGroup.patchValue({
        repoName: this.item.githubPR?.base?.repo?.name,
        branchName: this.item.githubPR?.head?.ref,
        targetBranchName: this.item.githubPR?.base?.ref,
        proficiency: this.item.proficiency,
        title: this.item.title,
        description: this.item.description,
        purpose: this.item.purpose,
      });
    }
  }

  private monitorValueChanges(): void {
    this.onRepoNameChanged();
  }

  private onRepoNameChanged(): void {
    const control = this.formGroup.get('repoName');
    control.valueChanges.subscribe(
      (value) => {
        this.repoName = value;

        if (!value) {
          return;
        }

        this.gitHubService.getBranches(this.ownerName, this.repoName).subscribe((result: IGitHubBranch[]) => {
          this.branches = result;

          if (this.item && Object.keys(this.item).length > 0) {
            this.formGroup.patchValue({
              branchName: this.item.githubPR?.head?.ref,
              targetBranchName: this.item.githubPR?.base?.ref,
            });
          }
        });
      },
    );
  }

  ngOnInit(): void {
    // this.targetBranchName = `gitcode/pr-${(new Date()).getTime()}`;

    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.ownerName = this.user.providerUserData.github.login;

      this.gitHubService.getAuthenticatedUserRepositories()
          .pipe(
            map(repos => repos.filter(repo => !repo.private)),
          )
          .subscribe((result: IGitHubRepo[]) => {
            this.repos = result;

            if (this.item && Object.keys(this.item).length > 0) {
              this.formGroup.patchValue({
                repoName: this.item.githubPR?.base?.repo?.name,
              });
            }
          });
    });
  }

  repoChanged(event): void {
    this.repoName = event.source.value;
    this.branchName = '';
    this.branches = [];

    if (this.repoName === '') {
      return;
    }

    this.gitHubService.getBranches(this.ownerName, this.repoName).subscribe((result: IGitHubBranch[]) => {
      this.branches = result;

      if (this.item && Object.keys(this.item).length > 0) {
        this.formGroup.patchValue({
          branchName: this.item.githubPR?.head?.ref,
          targetBranchName: this.item.githubPR?.base?.ref,
        });
      }
    });
  }

  public async onFormSubmitted(event, formValue): Promise<void> {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    await this.requestCreateReview(formValue);
  }

  public async requestCreateReview(formValue: any): Promise<void> {
    if (this.creatingPR) {
      return;
    }

    this.formGroup.disable();
    this.creatingPR = true;
    // const ref = await this.gitHubService.getRef(this.ownerName, this.repoName, 'master');
    // await this.gitHubService.createBranch(this.ownerName, this.repoName, this.targetBranchName, ref.object.sha);

    const payload = {
      title: formValue.title,
      head: formValue.branchName,
      base: formValue.targetBranchName,
      body: `${formValue.description}\n\n${formValue.purpose}`,
      maintainer_can_modify: true,
      draft: false,
    };

    const isEditMode = this.item && Object.keys(this.item).length > 0;
    if (isEditMode) {
      const data = {
        title: formValue.title,
        description: formValue.description,
        head: formValue.branchName,
        base: formValue.targetBranchName,
        body: `${formValue.description}\n\n${formValue.purpose}`,
        proficiency: formValue.proficiency,
        purpose: formValue.purpose,
      };

      await this.angularFirestore
                .collection('public-code-review')
                .doc(this.item.id)
                .set(data, { merge: true });

      this.formGroup.enable();
      this.creatingPR = false;

      this.item.title = data.title;
      this.item.description = data.description;
      this.item.proficiency = data.proficiency;
      this.item.purpose = data.purpose;

      this.dialogRef.close(true);
      return;
    }

    const requests = [
      this.gitHubService.createPR(this.ownerName, this.repoName, payload),
      this.gitHubService.getRepoLanguages(this.ownerName, this.repoName),
    ];

    forkJoin(requests)
      .pipe(
        map(
          (results) => {
            results[0].languages = results[1];
            return results[0];
          },
        ),
      )
      .subscribe(async (result: any) => {
        await this.postPR(result);
        this.addWebhook();

        alert('PR이 생성되었습니다!');
        this.isReviewRequestComplete = true;
      }, (error: any) => {
        alert(`PR 생성에 실패하였습니다.\n${error.statusText}`);
      }, () => {
        this.formGroup.enable();
        this.creatingPR = false;
      });
  }

  private addWebhook(): void {
    this.gitHubService.getWebhook(this.ownerName, this.repoName)
        .subscribe((result: any[]) => {
          const hasWebhook = result.filter(item => item.config.url === environment.github.webhookUrl).length > 0;

          if (!hasWebhook) {
            const payload = {
              name: 'web',
              config: {
                url: environment.github.webhookUrl,
                content_type: 'json',
                insecure_ssl: 0,
              },
              events: ['pull_request', 'pull_request_review', 'pull_request_review_comment'],
              active: true,
            };

            this.gitHubService.addWebhook(this.ownerName, this.repoName, payload)
                .subscribe((res: any) => {
                  console.log(res);
                });
          }
        });
  }

  private async postPR(prResponse: any): Promise<void> {
    const prNodeId = prResponse?.node_id;

    const doc = {
      state: 'open',
      title: this.title,
      proficiency: this.proficiency,
      description: this.description,
      purpose: this.purpose,
      reviewers: [],
      topics: prResponse?.head?.repo?.topics || [],
      author: this.user,
      githubPR: prResponse,
      createdAt: (new Date()).toISOString(),
    };

    await this.angularFirestore.doc(`public-code-review/${prNodeId}`).set(doc, { merge: true });
  }

  public closePopup(event): void {
    this.dialogRef.close(true);
  }
}

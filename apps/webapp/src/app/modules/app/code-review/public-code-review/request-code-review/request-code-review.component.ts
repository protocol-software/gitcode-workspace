import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {RequestCodeReviewService} from "./request-code-review.service";
import {GitHubService} from "../../../../../services/github.service";
import {AuthService} from "../../../../../services/auth.service";
import {IGitHubBranch, IGitHubRepo} from "@protocol/data";

@Component({
  selector: 'protocol-request-code-review',
  templateUrl: './request-code-review.component.html',
  styleUrls: ['./request-code-review.component.scss']
})
export class RequestCodeReviewComponent implements OnInit {
  // hideRequiredControl: any;
  // floatLabelControl: any;
  // options: any;
  public isReviewRequestComplete = false;

  public ownerName: string;
  public personalPublicRepos = [];
  public branchesOnRepo = [];

  constructor(
      public dialogRef: MatDialogRef<RequestCodeReviewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private requestCodeReviewService: RequestCodeReviewService,
      private gitHubService: GitHubService,
      private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.ownerName = user.providerUserData.github.login;

      this.gitHubService.getRepositories(this.ownerName).subscribe((result: IGitHubRepo[]) => {
        this.personalPublicRepos = result;
      });
    });
  }

  repoChanged(event): void {
    const selectedRepo = event.source.value;

    this.gitHubService.getBranches(this.ownerName, selectedRepo.name).subscribe((result: IGitHubBranch[]) => {
      this.branchesOnRepo = result;
    });
  }

  public async createReviewStep2(event: MouseEvent) {
    if (event) {
      // event.preventDefault();
      // event.stopPropagation();
      this.isReviewRequestComplete = true
    }
  }

  public closePopup(event) {
    this.dialogRef.close(true);
  }
}

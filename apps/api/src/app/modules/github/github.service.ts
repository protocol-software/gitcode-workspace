import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from "firebase-admin";
import {environment} from "../../../environments/environment";

@Injectable()
export class GithubService {
  constructor(
  ) {

  }

  private initFirebaseAdmin(): void {
    if (!firebaseAdmin.apps.length) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
          projectId: environment.firebaseServiceAccount.project_id,
          clientEmail: environment.firebaseServiceAccount.client_email,
          privateKey: environment.firebaseServiceAccount.private_key,
        }),
        databaseURL: environment.firebase.databaseURL,
      });
    }
  }

  public async receiveWebhook(xGithubEvent: string, body: any): Promise<any> {
    // X-GitHub-Event: pull_request, "action": "opened",
    // X-GitHub-Event: pull_request_review, "action": "edited",
    // X-GitHub-Event: pull_request_review, "action": "submitted",
    // X-GitHub-Event: pull_request_review_comment, "action": "created",

    const pullRequest = body.pull_request;
    if(!pullRequest) return;

    this.initFirebaseAdmin();

    const action = body.action;   // created, edited, submitted
    const prNodeId = body.pull_request.node_id;

    if(xGithubEvent === 'pull_request') {
      const prState = body.pull_request.state;
      const prData = {
        state: prState,
        updatedAt: (new Date()).toISOString()
      };

      await firebaseAdmin.firestore().doc(`public-code-review/${prNodeId}`).update(prData);
    }
    else if(xGithubEvent === 'pull_request_review') {
      const review = body.review;
      const reviewNodeId = review.node_id;

      const reviewData = {
        state: review.state,
        body: review.body,
        linkUrl: review.html_url,
        submittedAt: review.submitted_at,
        userName: review.user.login,
        userPhotoUrl: review.user.avatar_url,
        userProfileUrl: review.user.html_url,
        createdAt: (new Date()).toISOString(),
      };
      await firebaseAdmin.firestore().doc(`public-code-review/${prNodeId}/reviews/${reviewNodeId}`).set(reviewData, { merge: true });

      const reviewerNodeId = review.user.node_id;
      const reviewerData = {
        userNodeId: reviewerNodeId,
        userName: review.user.login,
        userPhotoUrl: review.user.avatar_url,
        userProfileUrl: review.user.html_url,
        createdAt: (new Date()).toISOString(),
      };
      // await firebaseAdmin.firestore().doc(`public-code-review/${prNodeId}/reviewers/${reviewerNodeId}`).set(reviewerData, { merge: true });

      const prDoc = (await firebaseAdmin.firestore().doc(`public-code-review/${prNodeId}`).get()).data();
      const hasReviewer = prDoc.reviewers.filter(reviewer => reviewer.userNodeId === reviewerNodeId).length;

      if(!hasReviewer) {
        prDoc.reviewers.push(reviewerData);
        await firebaseAdmin.firestore().doc(`public-code-review/${prNodeId}`).set({ reviewers: prDoc.reviewers }, {merge: true});
      }
    }
    else if(xGithubEvent === 'pull_request_review_comment') {
      const comment = body.comment;
      const commentNodeId = comment.node_id;

      const commentData = {
        body: comment.body,
        linkUrl: comment.html_url,
        updatedAt: comment.updated_at,
        userName: comment.user.login,
        userPhotoUrl: comment.user.avatar_url,
        userProfileUrl: comment.user.html_url,
        createdAt: (new Date()).toISOString(),
      };
      await firebaseAdmin.firestore().doc(`public-code-review/${prNodeId}/comments/${commentNodeId}`).set(commentData, { merge: true });
    }

    return null;
  }

}

import * as functions from 'firebase-functions';
import * as firebaseAdmin from 'firebase-admin';
firebaseAdmin.initializeApp();
const firestore = firebaseAdmin.firestore();

import * as prService from './pr-service';

export const githubAppWebhook = functions.https.onRequest(async (request, response) => {
  if(request.method !== "POST") {
    response.status(400).send('Please send a POST request');
    return;
  }
  if(request.headers["content-type"] !== 'application/json') {
    response.status(400).send('Please send the application/json request');
    return;
  }

  // let xGithubEvent = request.headers['X-GitHub-Event'];
  // let xGitHubDelivery = request.headers['X-GitHub-Delivery'];
  // let xHubSignature = request.headers['X-Hub-Signature'];
  // let userAgent = request.headers["user-agent"];

  const payload = request.body;

  const githubWebhookLogs = firestore.collection('github-webhook-logs');
  await githubWebhookLogs.add(payload);

  const action = payload['action'];
  const pullRequest = payload['pull_request'];
  const review = payload['review'];
  const senderId = payload['sender']['login'];

  if(pullRequest) {
    const prId = pullRequest['id'];
    const title = pullRequest['title'];
    const desc = pullRequest['body'];
    const url = pullRequest['url'];

    const author = pullRequest['user'];
    const authorId = author['login'];
    const authorAvatar = author['avatar_url'];

    if(action === 'opened') {
      await prService.createPR(prId, title, desc, authorId, authorAvatar, url, senderId);
    }
    if(action === 'reopened') {
      await prService.reopenPR(prId, senderId);
    }
    else if(action === 'submitted' && review) {
      const reviewerId = review['user']['login'];
      const reviewerAvatar = review['user']['avatar_url'];

      await prService.reviewSubmitted(prId, reviewerId, reviewerAvatar, senderId);
    }
    else if(action === 'closed') {
      await prService.closePR(prId, senderId);
    }
  }

  return response.send(payload);
});

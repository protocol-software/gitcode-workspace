import * as firebase from 'firebase';
import { IRating, PullRequestStatus } from '../..';
import Timestamp = firebase.firestore.Timestamp;

export interface IPullRequest {
  authorAvatar?: string;
  authorId?: string;
  createdAt?: Timestamp;
  createdBy?: string;
  desc?: string;
  id?: string;
  ratedReviewerIds?: string[];
  ratingComment?: string;
  ratings?: IRating[],
  reviewerAvatar?: string;
  reviewerId?: string;
  reviewerRating?: number;
  status?: PullRequestStatus | string;
  title?: string;
  updatedAt?: Timestamp;
  updatedBy?: string;
  url?: string;
}

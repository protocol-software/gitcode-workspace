import * as firebaseAdmin from 'firebase-admin';
const firestore = firebaseAdmin.firestore();

export const createPR = async(prId: string, title: string, desc: string, authorId: string, authorAvatar: string, url: string, senderId: string) => {
  await firestore.collection('public-pr').doc(String(prId)).set({
    authorId,
    authorAvatar,
    title,
    desc,
    status: 'Open',
    url,
    reviewerId: null,
    reviewerAvatar: null,
    reviewerRating: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: senderId,
    updatedBy: senderId,
  });
}

export const reviewSubmitted = async(prId: string, reviewerId: string, reviewerAvatar: string, senderId: string) => {
  await firestore.collection('public-pr').doc(String(prId)).update({
    status: 'In Review',
    reviewerId: reviewerId,
    reviewerAvatar: reviewerAvatar,
    updatedAt: new Date(),
    updatedBy: senderId,
  });
}

export const closePR = async(prId: string, senderId: string) => {
  await firestore.collection('public-pr').doc(String(prId)).update({
    status: 'Closed',
    updatedAt: new Date(),
    updatedBy: senderId,
  });
}

export const reopenPR = async(prId: string, senderId: string) => {
  await firestore.collection('public-pr').doc(String(prId)).update({
    status: 'Reopen',
    updatedAt: new Date(),
    updatedBy: senderId,
  });
}

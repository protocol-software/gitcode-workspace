import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IUser, OAuthProvider } from '@re-code-io/data';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { GitHubService } from './github.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<IUser>;
  protected collectionName = 'users';

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private gitHubService: GitHubService,
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<IUser>(`${this.collectionName}/${user.uid}`).valueChanges().pipe(
            tap(
              (authUser) => {
                if (!authUser || !authUser.providerUserData) {
                  return;
                }

                if (authUser.providerUserData[OAuthProvider.GITHUB]) {
                  this.gitHubService.AccessToken = authUser.accessToken;
                  localStorage.setItem('githubAccessToken', authUser.accessToken);
                }
              },
            ),
          );
        }

        // Logged out
        return of(null);
      }),
    );
  }

  public async register(email: string, password: string): Promise<auth.UserCredential> {
    return await auth().createUserWithEmailAndPassword(email, password);
  }

  public async signIn(email: string, password: string): Promise<auth.UserCredential> {
    return await auth().signInWithEmailAndPassword(email, password);
  }

  public async signInOAuth(oauthProvider: OAuthProvider): Promise<void> {
    let provider;

    switch (oauthProvider) {
      case OAuthProvider.FACEBOOK:
        provider = new auth.FacebookAuthProvider();
        break;
      case OAuthProvider.GITHUB:
        provider = new auth.GithubAuthProvider();
        provider.addScope('user,repo');
        break;
      case OAuthProvider.GOOGLE:
        provider = new auth.GoogleAuthProvider();
        break;
      case OAuthProvider.TWITTER:
        provider = new auth.TwitterAuthProvider();
        break;
      default:
        throw new Error('OAuth provider not supported');
    }

    // provider.addScope('profile');
    // provider.addScope('email');

    const userCredential = await this.afAuth.signInWithPopup(provider);
    const providerUserData = await this.getProviderUserData(oauthProvider, userCredential);

    return this.updateUserData(userCredential, oauthProvider, providerUserData);
  }

  private getProviderUserData(oauthProvider: OAuthProvider, userCredential: auth.UserCredential): Promise<any> {
    let providerUserData;

    switch (oauthProvider) {
      case OAuthProvider.FACEBOOK:
        break;
      case OAuthProvider.GITHUB:
        this.gitHubService.AccessToken = userCredential.credential['accessToken'];
        providerUserData = this.gitHubService.getUser().toPromise();

        break;
      case OAuthProvider.GOOGLE:
        break;
      case OAuthProvider.TWITTER:
        break;
      default:
        throw new Error('OAuth provider not supported');
    }

    return providerUserData;
  }

  private updateUserData(
    userCredential: auth.UserCredential,
    oauthProvider: OAuthProvider,
    providerUserData: any,
  ): Promise<void> {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`${this.collectionName}/${userCredential.user.uid}`);

    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      accessToken: userCredential.credential['accessToken'],
      lastLogin: (
        new Date()
      ).toISOString(),

      // TODO: get existing provider user data.
      providerUserData: {},
    };

    if (providerUserData) {
      userData.providerUserData[oauthProvider] = providerUserData;
    }

    return userRef.set(userData, { merge: true });
  }

  public async signOut(): Promise<void> {
    localStorage.clear();
    await this.afAuth.signOut();
    await this.router.navigate(['/']);
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IUser, OAuthProvider } from '@gitcode/data';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { GitHubService } from './github.service';
import {AuthUtils} from '../core/auth/auth.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<IUser>;
  protected collectionName = 'users';
  public _authenticated = false;
  public accessToken;

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
                  localStorage.setItem('accessToken', authUser.accessToken);

                  this._authenticated = true;
                  this.accessToken = authUser.accessToken;
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

  // public async register(email: string, password: string): Promise<firebase.auth.UserCredential> {
  //   return await firebase.auth().createUserWithEmailAndPassword(email, password);
  // }
  //
  // public async signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
  //   return await firebase.auth().signInWithEmailAndPassword(email, password);
  // }

  public async signInOAuth(oauthProvider: OAuthProvider): Promise<any> {
    let provider;

    switch (oauthProvider) {
      case OAuthProvider.FACEBOOK:
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case OAuthProvider.GITHUB:
        provider = new firebase.auth.GithubAuthProvider();
        provider.setCustomParameters({prompt: 'login'});
        provider.addScope('user,repo,admin:repo_hook');
        break;
      case OAuthProvider.GOOGLE:
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case OAuthProvider.TWITTER:
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      default:
        throw new Error('OAuth provider not supported');
    }

    // provider.addScope('profile');
    // provider.addScope('email');

    return await this.afAuth.signInWithPopup(provider);   

    // 가입여부 체크
    // const existsUserData = await this.getSignedUserData(userCredential);
    // const isSigned = existsUserData.exists;

    // const providerUserData = await this.getProviderUserData(oauthProvider, userCredential);    
    // return this.updateUserData(userCredential, oauthProvider, providerUserData);
  }

  public getProviderUserData(oauthProvider: OAuthProvider, userCredential: firebase.auth.UserCredential): Promise<any> {
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

  public updateUserData(
    userCredential: firebase.auth.UserCredential,
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

  public getSignedUserData (
    userCredential: firebase.auth.UserCredential,    
  ): Promise<any> {
    return this.afs.doc(`${this.collectionName}/${userCredential.user.uid}`).get().toPromise()
  }

  public deleteUserData (
    userUid: string
  ): Promise<void> {
    return this.afs.doc(`${this.collectionName}/${userUid}`).delete()
  }

  public async signIn(): Promise<boolean> {
    const userCredential = await this.signInOAuth(OAuthProvider.GITHUB);
    const signedUserData = await this.getSignedUserData(userCredential);

    if(!signedUserData.exists) {
      return false;
    }
    else {
      const providerUserData = await this.getProviderUserData(OAuthProvider.GITHUB, userCredential);
      await this.updateUserData(userCredential, OAuthProvider.GITHUB, providerUserData);

      return true;
    }
  }

  public async signOut(): Promise<void> {
    localStorage.clear();

    this._authenticated = false;
    this.accessToken = null;

    await this.afAuth.signOut();
    await this.router.navigate(['/']);
  }

  check(): Observable<boolean>
  {
    // Check if the user is logged in
    if ( this._authenticated )
    {
      return of(true);
    }

    // Check the access token availability
    if ( !this.accessToken )
    {
      return of(false);
    }

    // Check the access token expire date
    if ( AuthUtils.isTokenExpired(this.accessToken) )
    {
      return of(false);
    }

    return of(false);
  }
}

import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from "rxjs/operators";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {
  Auth, sendPasswordResetEmail, confirmPasswordReset,
  signInWithEmailAndPassword, signOut,
  authState,
  User as fbUser, UserCredential, User
} from '@angular/fire/auth';
import { UsersRepository } from '../../repositories/users.repository';
import { COLLECTIONS } from '../../consts/collections.const';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUsersRepository extends UsersRepository {

  private readonly name: string = COLLECTIONS.users;
  private collection: AngularFirestoreCollection<User>;
  items: Observable<User[]>;
  user$: Observable<fbUser | null>;

  constructor(
    private afs: AngularFirestore,
    private auth: Auth
  ) {
    super();
    this.user$ = authState(auth);
    this.collection = afs.collection<User>(this.name);
    this.items = this.collection.valueChanges();
  }

  get authState() {
    return this.user$.pipe(
      mergeMap(
        async (authState) => {
          if (!authState) return null;
          const idTokenResult = await authState.getIdTokenResult();
          return {
            id: authState.uid,
            displayName: authState.displayName,
            email: authState.email,
            phoneNumber: authState.phoneNumber,
            photoURL: authState.photoURL,
            providerId: authState.providerId
          } as unknown as User
        }
      )
    );
  }

  login(param: { email: string; password: string }): Observable<UserCredential> {
    return new Observable(ob => {
      signInWithEmailAndPassword(this.auth, param.email, param.password)
        .then(data => {
          ob.next(data);
        })
        .catch(error => {
          console.log('ERROR', error)
          ob.error(error);
        })
    });
  }


  logout(): Observable<any> {
    return new Observable(ob => {
      signOut(this.auth)
        .then(() => {
          ob.next();
        })
        .catch(error => {
          ob.error(error);
        })
    });
  }

  sendResetPasswordEmail(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email, { url: '/auth/password-reset' });
  }

  confirmPasswordReset(code: string, newPassword: string): Observable<void> {
    return from(confirmPasswordReset(this.auth, code, newPassword))
  }

}

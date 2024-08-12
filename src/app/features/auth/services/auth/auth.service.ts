import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { user, Auth, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  private auth = inject(Auth);
  public user$ = user(this.auth);

  public login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  };

  public register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  };

  public logout(): Observable<void> {
    return from(this.auth.signOut());
  };
}

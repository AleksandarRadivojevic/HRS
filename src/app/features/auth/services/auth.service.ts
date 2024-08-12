import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Route } from '../../../app.routes';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  public user$ = user(this.auth);

  // Route Guard
  public canActivate(): boolean {
    if (!this.auth.currentUser) {
      this.router.navigate([Route.Login])
      return false;
    }
    return true;
  }

  public login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  public logout(): Observable<void> {
    return from(this.auth.signOut());
  }
}

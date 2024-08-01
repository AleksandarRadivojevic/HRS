import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  user,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  public user$ = user(this.auth);

  public login(email: string, password: string) {
    // fetch('https://dogapi.dog/api/v2/breeds');
    signInWithEmailAndPassword(this.auth, email, password);
  }

  public register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password);
  }

  public logout() {}
}

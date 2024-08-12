import { inject, Injectable } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Route } from '../../../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  private auth = inject(Auth);
  private router = inject(Router);

  public canActivateScheduler(): Observable<boolean> {
    return user(this.auth).pipe(map((user: User | null) => {
      if (user !== null) {
        return true;
      }
      this.router.navigate([Route.Login])
      return false;
    }));
  };

  public canActivateAuth(): Observable<boolean> {
    return user(this.auth).pipe(map((user: User | null) => {
      if (user === null) {
        return true;
      }
      this.router.navigate(['/'])
      return false;
    }));
  };
}

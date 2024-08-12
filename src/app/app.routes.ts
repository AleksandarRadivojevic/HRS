import { Routes } from '@angular/router';
import { SchedulerComponent } from './features/scheduler/scheduler.component';
import { AuthComponent } from './features/auth/auth.component';
import { inject } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';

export enum Route {
  Auth = 'auth',
  Login = 'login',
  Signup = 'signup',
}

export const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
    canActivate: [() => inject(AuthService).canActivate()]
  },
  {
    path: Route.Login,
    component: AuthComponent,
    data: { route: Route.Login }
  },
  {
    path: Route.Signup,
    component: AuthComponent,
    data: { route: Route.Signup }
  },
];

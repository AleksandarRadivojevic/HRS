import { Routes } from '@angular/router';
import { SchedulerComponent } from './features/scheduler/scheduler.component';
import { GuardService } from './features/auth/services/guard/guard.service';
import { AuthComponent } from './features/auth/auth.component';
import { inject } from '@angular/core';

export enum Route {
  Auth = 'auth',
  Login = 'login',
  Signup = 'signup',
}

export const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
    canActivate: [() => inject(GuardService).canActivateScheduler()]
  },
  {
    path: Route.Login,
    component: AuthComponent,
    data: { route: Route.Login },
    canActivate: [() => inject(GuardService).canActivateAuth()]
  },
  {
    path: Route.Signup,
    component: AuthComponent,
    data: { route: Route.Signup },
    canActivate: [() => inject(GuardService).canActivateAuth()]
  },
];

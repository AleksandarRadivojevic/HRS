import { Routes } from '@angular/router';
import { SchedulerComponent } from './features/scheduler/scheduler.component';
import { AuthComponent } from './features/auth/auth.component';
import { inject } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';

export enum Route {
  // TODO: Please rename route according to our conversation
  Auth = 'auth',
}

export const routes: Routes = [
  {
    path: '',
    component: SchedulerComponent,
    canActivate: [() => inject(AuthService).canActivate()]
  },
  {
    path: Route.Auth,
    component: AuthComponent
  },
];

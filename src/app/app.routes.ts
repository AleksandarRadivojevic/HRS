import { Routes } from '@angular/router';
import { SchedulerComponent } from './features/scheduler/scheduler.component';
import { AuthComponent } from './features/auth/auth.component';

export enum Route {
  Auth = 'auth',
}

export const routes: Routes = [
  { path: '', component: SchedulerComponent },
  { path: Route.Auth, component: AuthComponent },
];

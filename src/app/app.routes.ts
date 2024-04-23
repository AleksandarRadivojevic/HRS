import { Routes } from '@angular/router';
import { SchedulerComponent } from './features/scheduler/scheduler.component';
import { LoginComponent } from './features/login/login.component';

export enum Route {
  Login = 'login',
}

export const routes: Routes = [
  { path: '', component: SchedulerComponent },
  { path: Route.Login, component: LoginComponent },
];

import { Routes } from '@angular/router';
import { SchedulerComponent } from './features/scheduler/scheduler.component';
import { LoginComponent } from './features/login/login.component';

export enum ROUTE {
  Login = 'login',
}

export const routes: Routes = [
  { path: '', component: SchedulerComponent },
  { path: ROUTE.Login, component: LoginComponent },
];

import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { adminRoutes } from './admin/admin.routing';
import { userRoutes } from './user/user.routing';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  ...adminRoutes,
  ...userRoutes,
];

export const appConfig = [provideRouter(routes, withComponentInputBinding())];

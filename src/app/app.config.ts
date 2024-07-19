import { provideRouter, withComponentInputBinding } from '@angular/router';
import { adminRoutes } from './admin/admin.routing';
import { userRoutes } from './user/user.routing';
import { LoginComponent } from './auth/login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';

const routes = [
  { path: '', component: LoginComponent },
  ...adminRoutes,
  ...userRoutes,
];

export const appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
  ],
};

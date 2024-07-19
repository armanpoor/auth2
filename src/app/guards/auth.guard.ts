import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Import your AuthService

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService) {}

  canActivate(): CanActivateFn {
    return () => {
      return this.authService.isAuthenticated(); // Check authentication status
    };
  }
}

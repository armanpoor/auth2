import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = this.authService.getCurrentUser();
    if (user && (await this.authService.isAdmin(user))) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

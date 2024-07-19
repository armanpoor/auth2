import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class AppComponent {
  title = 'irisa-armanpoor-bookStore';
  constructor(public authService: AuthService) {}

  async onLogout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}

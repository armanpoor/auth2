import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class AppComponent implements OnInit {
  loading = true;
  title = 'irisa-armanpoor-bookStore';
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // Ensure the application is initialized before making Supabase requests
    this.initializeApp();
  }
  private initializeApp(): void {
    // Initialize Supabase after the page load
    this.authService.initializeSupabase();

    // Simulate initialization delay
    setTimeout(() => {
      this.loading = false;
    }, 10000); // Adjust the timeout as needed
  }
  async onLogout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}

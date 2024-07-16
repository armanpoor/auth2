// login.component.ts
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthUser } from '@supabase/supabase-js';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule, // Add the FormsModule to the imports array
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  registrationEmail: string = '';
  registrationPassword: string = '';

  constructor(private authService: AuthService) {}

  async login() {
    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        console.log('Logged in user:', user);
        // Redirect to dashboard or perform other actions
      } else {
        console.error('Login failed. User not authenticated.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error
    }
  }

  async register() {
    try {
      const user: AuthUser | null = await this.authService.registerUser(
        this.registrationEmail,
        this.registrationPassword
      );
      if (user) {
        // Handle successful registration, e.g., show success message
        console.log('Registered user:', user);
      } else {
        // Handle registration failure
        console.error('Registration failed. User not registered.');
      }
    } catch (error) {
      throw error;
    }
  }
}

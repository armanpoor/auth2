import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.isLoginMode) {
      if (this.loginForm.invalid) {
        return;
      }

      try {
        const { email, password } = this.loginForm.value;
        const response = await this.authService.signInWithPassword(
          email,
          password
        );

        if (response.error) {
          console.error('Login error:', response.error.message);
          return;
        }

        const isAdmin = await this.authService.isAdmin();
        if (isAdmin) {
          this.router.navigate(['/admin/book-list']);
        } else {
          this.router.navigate(['/user/book-list']);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      if (this.registerForm.invalid) {
        return;
      }

      const { email, password, confirmPassword } = this.registerForm.value;
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      try {
        const response = await this.authService.registerUser(email, password);

        if (response.error) {
          console.error('Registration error:', response.error.message);
          return;
        }

        console.log('User registered successfully:', response.user);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }
}
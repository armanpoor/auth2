import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private session: Session | null = null;

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this.session = session;
    });

    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.session = session;
    });
  }

  async login(email: string, password: string): Promise<void> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error logging in:', error);
      throw error;
    }
    if (data.user) {
      if (this.isAdmin(data.user)) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
      throw error;
    }
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return this.session?.user || null;
  }

  isAdmin(user = this.getCurrentUser()): boolean {
    if (user) {
      const role = user.user_metadata?.['role'];
      return role === 'admin';
    }
    return false;
  }
}

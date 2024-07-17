import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
  Session,
  AuthSession,
  AuthUser,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

interface AuthResponse {
  data: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
  error: any;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: AuthUser | null = null;
  private supabase: SupabaseClient;
  private session: Session | null = null;
  // currentUser: any;

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.supabase.auth
      .getSession()
      .then((res) => {
        this.session = res.data?.session || null;
      })
      .catch((error) => {
        console.error('Error getting session:', error);
      });
    this.supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      if (session) {
        this.session = session;
      } else {
        this.session = null;
        console.error('Error getting session:', Error);
      }
    });
  }
  async registerUser(
    email: string,
    password: string
  ): Promise<AuthUser | null> {
    try {
      const { data, error }: AuthResponse = await this.supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      this.currentUser = data.user; // Store current user in service

      return data.user; // Return the user object upon successful registration
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error logging in:', error);
      throw error;
    }
    if (data.user) {
      if (await this.isAdmin()) {
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

  /**
   * Checks if the given user is an admin.
   * Fetches the user's roles from the 'user_roles' table and checks if any of the roles is 'admin'.
   * @return {Promise<boolean>} A promise that resolves to true if the user is an admin, false otherwise.
   */
  async isAdmin(): Promise<boolean> {
    // Fetch the current user
    const { data: currentUser, error } = await this.supabase.auth.getUser();
    if (error) {
      // Log an error if there was an issue fetching the user
      console.error('Error fetching user:', error.message);
      return false;
    }

    // Fetch the roles of the current user from the 'user_roles' table
    const { data: roles, error: rolesError } = await this.supabase
      .from('user_roles')
      .select('role_id')
      .eq('user_id', currentUser?.user);
    if (rolesError) {
      // Log an error if there was an issue fetching the roles
      console.error('Error fetching roles:', rolesError.message);
      return false;
    }

    // Check if any of the roles is 'admin'
    const isAdmin = roles?.some((role) => role.role_id === 'admin');
    return !!isAdmin;
  }
}

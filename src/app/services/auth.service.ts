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
import { BehaviorSubject, Observable } from 'rxjs';

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
  private supabase: SupabaseClient;
  private sessionSubject: BehaviorSubject<Session | null>;
  // private currentUser: AuthUser | null = null;
  // private session: Session | null = null;
  // currentUser: any;

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.sessionSubject = new BehaviorSubject<Session | null>(null);

    // Fetch the current session
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this.sessionSubject.next(session);
    });

    // Subscribe to authentication state changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.sessionSubject.next(session);
    });
    // this.supabase.auth
    //   .getSession()
    //   .then((res) => {
    //     this.session = res.data?.session || null;
    //     console.log('Session:', this.session);
    //   })
    //   .catch((error) => {
    //     console.error('Error getting session:', error);
    //   });

    // this.supabase.auth.onAuthStateChange((_event, session: Session | null) => {
    //   if (session) {
    //     this.session = session;
    //     console.log('Auth state changed:', this.session);
    //   } else {
    //     this.session = null;
    //     console.error('Error getting session:', Error);
    //   }
    // });
  }

  /**
   * Getter for the session subject observable.
   *
   * @return {Observable<Session | null>} The session subject observable.
   */
  get session$(): Observable<Session | null> {
    return this.sessionSubject.asObservable();
  }

  async signInWithPassword(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('Sign in response:', { data, error });
    return { user: data.user, error };
  }
  async registerUser(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    console.log('Register response:', { data, error });
    return { user: data.user, error };
  }

  async login(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('Login response:', { data, error });
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

  getRedirectPath(session: Session | null): string {
    if (!session) return '/';
    const userRole = session.user?.role; // Replace with actual role retrieval logic
    return userRole === 'admin' ? '/admin' : '/user';
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
    console.log('Current user:', currentUser);

    // Fetch the roles of the current user from the 'user_roles' table
    const { data: roles, error: rolesError } = await this.supabase
      .from('user_roles')
      .select('role_id')
      .eq('user_id', currentUser?.user);
    if (rolesError) {
      // Log an error if there was an issue fetching the roles
      console.error('Error fetching user role:', rolesError.message);
      return false;
    }
    console.log('User roles:', roles);

    // Check if any of the roles is 'admin'
    const isAdmin = roles?.some((role) => role.role_id === 2);
    console.log('Is admin:', isAdmin);
    return !!isAdmin;
  }
}

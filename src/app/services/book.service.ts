import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private supabase: SupabaseClient;

  constructor(private http: HttpClient) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getAllBooks(): Promise<Book[]> {
    const { data, error } = await this.supabase.from('books').select('*');
    if (error) {
      console.error('Error fetching books:', error.message);
      throw error;
      return [];
    }
    return data as Book[];
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`your_api_endpoint/${bookId}`);
  }

  addBook(bookId: number, book: Book): Observable<Book> {
    return new Observable((observer) => {
      this.supabase
        .from('books')
        .insert([book])
        .eq('id', bookId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error adding book:', error);
            observer.error(error);
          } else {
            observer.next(data as Book);
            observer.complete();
          }
        });
    });
  }

  async updateBook(id: number, updates: any): Promise<void> {
    const { error } = await this.supabase
      .from('books')
      .update(updates)
      .eq('id', id);
    if (error) {
      console.error('Error updating book:', error.message);
    }
  }

  async deleteBook(id: number): Promise<void> {
    const { error } = await this.supabase.from('books').delete().eq('id', id);
    if (error) {
      console.error('Error deleting book:', error.message);
    }
  }
}

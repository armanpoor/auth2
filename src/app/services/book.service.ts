import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})

export class BookService {
  private supabase: SupabaseClient;

  constructor() {
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

  async getBookById(id: number): Promise<Book> {
    const { data, error } = await this.supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
    return data as Book;
  }

  async addBook(book: Book): Promise<Book> {
    const { data, error } = await this.supabase
      .from('books')
      .insert([book])
      .single();
    if (error) {
      console.error('Error adding book:', error);
      throw error;
    }
    return data as Book;
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

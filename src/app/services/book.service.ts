import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

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

  // Get all books
  async getAllBooks(): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.from('books').select('*');

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching books:', error);
      return []; // Return empty array in case of error
    }
  }

  async getBookById(id: number): Promise<any> {
    const { data, error } = await this.supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching book:', error);
      return null;
    }
    return data;
  }

  // Add a new book
  async addBook(book: {
    name: string;
    author: string;
    price: number;
    summary: string;
  }): Promise<void> {
    const { error } = await this.supabase.from('books').insert(book);

    if (error) {
      console.error('Error adding book:', error);
    }
  }

  // Update an existing book
  async updateBook(
    id: number,
    book: { name: string; author: string; price: number; summary: string }
  ): Promise<void> {
    const { error } = await this.supabase
      .from('books')
      .update(book)
      .eq('id', id);

    if (error) {
      console.error('Error updating book:', error);
    }
  }

  // Delete a book by ID
  async deleteBook(id: number): Promise<void> {
    const { error } = await this.supabase.from('books').delete().eq('id', id);

    if (error) {
      console.error('Error deleting book:', error);
    }
  }
}

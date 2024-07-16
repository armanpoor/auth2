import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.books = await this.bookService.getAllBooks();
    } catch (error) {
      console.error('Error fetching books', error);
    }
  }

  async onDelete(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      await this.bookService.deleteBook(id);
      this.books = await this.bookService.getAllBooks();
    }
  }
}

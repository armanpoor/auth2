import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class AdminBookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];

  private subscription: Subscription | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loadBooks();
    } catch (error) {
      console.error('Error fetching books', error);
    }
  }

  // async onDelete(bookid: number | undefined) {
  //   if (
  //     confirm('Are you sure you want to delete this book?') &&
  //     bookid !== undefined
  //   ) {
  //     await this.bookService.deleteBook(bookid);
  //     this.books = await this.bookService.getAllBooks();
  //   }
  // }

  async onDelete(bookId: number): Promise<void> {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await this.bookService.deleteBook(bookId);
        this.loadBooks(); // Refresh the book list
        this.cdr.detectChanges(); // Manually trigger change detection
      } catch (error) {
        console.error('Error deleting book:', error);
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    }
  }

  async loadBooks(): Promise<void> {
    try {
      this.books = await this.bookService.getAllBooks();
      this.cdr.detectChanges(); // Manually trigger change detection
    } catch (error) {
      console.error('Error loading books:', error);
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  onEdit(bookId: number): void {
    this.router.navigate(['/admin/book-form', bookId]);
  }
}

import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit, OnDestroy {
  @Input() bookId: number | null = null;
  book: Book = {
    name: '',
    author: '',
    price: 0,
    summary: '',
  };

  bookForm: FormGroup;
  private subscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    @Inject(BookService) private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      name: [''],
      author: [''],
      price: [''],
      summary: [''],
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    if (this.bookId) {
      this.loadBook();
    }
  }

  async loadBook(): Promise<void> {
    if (this.bookId) {
      this.book = await this.bookService.getBookById(this.bookId);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      if (this.bookId !== null) {
        await this.bookService.updateBook(this.bookId, bookData);
        this.router.navigate(['/admin/book-list']);
      } else {
        const bookId = this.bookService.addBook(this.book);
        this.router.navigate(['/admin/book-list', bookId]);
      }
    }
  }
}

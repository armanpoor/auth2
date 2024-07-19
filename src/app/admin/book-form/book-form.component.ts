import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit, OnDestroy {
  bookForm: FormGroup;
  private subscription: Subscription | undefined;
  private bookId: number | null = null;

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

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id']
      ? +this.route.snapshot.params['id']
      : null;
    if (this.bookId) {
      this.subscription = this.bookService
        .getBookById(this.bookId)
        .subscribe((book: { [key: string]: any }) => {
          this.bookForm.patchValue(book);
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      if (this.bookId !== null) {
        await this.bookService.updateBook(this.bookId, bookData);
        this.router.navigate(['/admin/book-list']);
      } else {
        const bookId = this.bookService.addBook(
          this.bookId || 0,
          this.bookForm.value
        );
        this.router.navigate(['/admin/book-list', bookId]);
      }
    }
  }
}

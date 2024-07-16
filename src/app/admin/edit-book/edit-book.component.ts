import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  bookId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      name: [''],
      author: [''],
      price: [''],
      summary: [''],
    });
  }

  async ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id') ?? undefined;
    const bookIdNumber = parseInt(this.bookId || '', 10);
    const book = await this.bookService.getBookById(bookIdNumber);
    this.bookForm.patchValue(book);
  }

  async onSubmit() {
    const book = this.bookForm.value;
    const bookIdNumber = parseInt(this.bookId || '0', 10); // Convert this.bookId to number, defaulting to 0 if it's undefined
    await this.bookService.updateBook(bookIdNumber, book);
  }
}

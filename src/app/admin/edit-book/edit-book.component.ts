import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from '../../../services/book.service';
@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  bookId: string;

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
    this.bookId = this.route.snapshot.paramMap.get('id');
    const book = await this.bookService.getBookById(this.bookId);
    this.bookForm.patchValue(book);
  }

  async onSubmit() {
    const book = this.bookForm.value;
    await this.bookService.updateBook(this.bookId, book);
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      summary: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookService.addBook(newBook).then(
        (book) => {
          console.log('Book added successfully', book);
          this.bookForm.reset();
        },
        (error) => {
          console.error('Error adding book', error);
        }
      );
    }
  }
}

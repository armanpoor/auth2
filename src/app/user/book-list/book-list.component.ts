import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})

export class UserBookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private subscription: Subscription | undefined;

  constructor(private bookService: BookService) {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.bookService.getAllBooks().then(
      (books) => {
        this.books = books;
      },
      (error) => {
        console.error('Error fetching books', error);
      }
    );
  }
}

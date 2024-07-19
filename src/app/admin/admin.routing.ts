import { Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AdminBookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: 'book-list', component: AdminBookListComponent },
      { path: 'books/new', component: BookFormComponent },
      { path: 'books/edit/:id', component: BookFormComponent },
    ],
  },
];

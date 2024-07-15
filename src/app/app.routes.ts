import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const appRoutes: Routes = [
  { path: '', component: BookListComponent, canActivate: [AuthGuard] },
  {
    path: 'book/:id',
    component: BookDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin', component: AddBookComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
];

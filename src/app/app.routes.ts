import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './admin/book-list/book-list.component';
import { AddBookComponent } from './admin/add-book/add-book.component';
import { EditBookComponent } from './admin/edit-book/edit-book.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { BookDetailsComponent } from './admin/book-details/book-details.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './admin/admin.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', component: BookListComponent },
      { path: 'add-book', component: AddBookComponent },
      { path: 'edit-book/:id', component: EditBookComponent },
      { path: 'book-details/:id', component: BookDetailsComponent },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'book-details/:id', component: BookDetailsComponent }],
  },
];

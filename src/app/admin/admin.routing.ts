import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AdminGuard } from './admin.guard';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'book-list', pathMatch: 'full' },
      { path: 'book-list', component: BookListComponent },
      { path: 'add-book', component: AddBookComponent },
      { path: 'edit-book/:id', component: EditBookComponent },
    ],
  },
];

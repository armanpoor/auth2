import { Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserBookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'book-list', component: UserBookListComponent },
      { path: 'book-details/:id', component: BookDetailsComponent },
    ],
  },
];

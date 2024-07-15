import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

import { BookListComponent } from './app/components/book-list/book-list.component';
import { BookDetailsComponent } from './app/components/book-details/book-details.component';
import { AddBookComponent } from './app/components/add-book/add-book.component';
import { LoginComponent } from './app/components/login/login.component';

platformBrowserDynamic()
  .bootstrapModule({
    declarations: [
      AppComponent,
      BookListComponent,
      BookDetailsComponent,
      AddBookComponent,
      LoginComponent,
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
    ],
    providers: [],
    bootstrap: [AppComponent],
  })
  .catch((err) => console.error(err));

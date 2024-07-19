import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

platformBrowserDynamic()
  .bootstrapModule(AppComponent)
  .then(() => {
    return bootstrapApplication(AppComponent, {
      providers: [provideRouter(routes), provideHttpClient()],
    });
  })
  .catch((err) => console.error(err));

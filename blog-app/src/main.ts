import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/ui/pages/main/app.config';
import { AppComponent } from './app/ui/pages/main/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

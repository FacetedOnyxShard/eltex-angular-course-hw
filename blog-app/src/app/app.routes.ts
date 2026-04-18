import { Routes } from '@angular/router';
import { MainContentComponent } from './ui/components/main-content/main-content.component';
import { MainPageComponent } from './ui/pages/main-page/main-page.component';
import { BlogPageComponent } from './ui/pages/blog-page/blog-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'blog', component: BlogPageComponent },
];

import { Component } from '@angular/core';
import { MainContentComponent } from '../../components/main-content/main-content.component';

@Component({
  selector: 'app-main-page',
  imports: [MainContentComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './styles/main-page.component.scss',
})
export class MainPageComponent {}

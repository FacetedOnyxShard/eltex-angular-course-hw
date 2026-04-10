import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterFormComponent } from '../../components/footer-form/footer-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainContentComponent } from '../../components/main-content/main-content.component';

@Component({
  selector: 'app-main-page',
  imports: [HeaderComponent, FooterComponent, MainContentComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './styles/main-page.component.scss',
})
export class MainPageComponent {}

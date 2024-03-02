import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  isIndigo: boolean = true;
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.isIndigo = !this.isIndigo;
    console.log(this.isIndigo);
  }
}

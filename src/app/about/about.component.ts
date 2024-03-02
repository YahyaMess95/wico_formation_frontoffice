import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  constructor(public themeService: ThemeService) {}

  get aboutBgColor() {
    return this.themeService.aboutBgColor;
  }

  get aboutTextColor() {
    return this.themeService.aboutTextColor;
  }
}

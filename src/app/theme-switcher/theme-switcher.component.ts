// theme-switcher.component.ts
import { Component, HostBinding, HostListener } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css'],
})
export class ThemeSwitcherComponent {
  isScrolled = false;
  logo = 'logo-b';
  showMenu = false;
  activeSection: string;

  constructor(public themeService: ThemeService) {
    this.activeSection = 'home';
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.activeSection === 'home') {
      this.isScrolled = window.scrollY > 150;
      this.logo = this.isScrolled || this.showMenu ? 'logo' : 'logo-b';
    } else {
      this.isScrolled = true;
      this.logo = this.isScrolled ? 'logo' : '';
    }
  }

  get textColor() {
    return this.themeService.textColor;
  }

  get paragraphColor() {
    return this.themeService.paragraphColor;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

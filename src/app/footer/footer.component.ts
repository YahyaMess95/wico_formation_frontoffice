import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../app-services/app-state.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(
    private router: Router,
    private appStateService: AppStateService,
    public themeService: ThemeService
  ) {}

  goToContactPage() {
    this.appStateService.setActiveSection('contact');
    this.router.navigate(['/contact']);
  }

  goToTrainingPage() {
    this.appStateService.setActiveSection('training');
    this.router.navigate(['/training']);
  }

  goToHomePage() {
    this.appStateService.setActiveSection('home');
    this.router.navigate(['/']);
  }
}

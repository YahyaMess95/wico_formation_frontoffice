import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Wico';
  showFixedNavBar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFixedNavBar = this.shouldShowFixedNavBar(event.url);
      }
    });
  }

  shouldShowFixedNavBar(url: string): boolean {
    return url.includes('/training') || url.includes('/contact');
  }
}

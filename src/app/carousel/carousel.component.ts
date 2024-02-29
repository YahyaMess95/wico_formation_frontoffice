import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  constructor(public themeService: ThemeService) {}

  get carouselBgColor() {
    return this.themeService.carouselBgColor;
  }
  get carouselShadow() {
    return this.themeService.carouselShadow;
  }
  get carouselBorder() {
    return this.themeService.carouselBorder;
  }
}

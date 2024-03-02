import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  //general
  get darkThemeValidator() {
    return this.isDarkTheme;
  }
  get LogoColor() {
    return this.isDarkTheme ? 'logo' : 'logo-b';
  }
  get textColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#37517e';
  }
  get paragraphColor() {
    return this.isDarkTheme ? '#99cc99' : '#336633';
  }
  get bgColor() {
    return this.isDarkTheme ? '#212121' : '#FFFFFF';
  }
  get subTitleTextColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#212121';
  }

  //navbar section
  get navbarTextColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#000000';
  }
  get navbarTextBorderColor() {
    return this.isDarkTheme ? '1px solid #EEEEEE' : '';
  }
  get navbarButtonBorderColor() {
    return this.isDarkTheme ? '1px solid #EEEEEE' : '';
  }

  //carousel section
  get carouselBgColor() {
    return this.isDarkTheme ? 'rgba(33, 33, 33, 0.8)' : '#37517eaf';
  }
  get carouselShadow() {
    return this.isDarkTheme ? '' : '0 25px 50px -12px rgba(33, 33, 33, 0.75)';
  }
  get carouselBorder() {
    return this.isDarkTheme ? '2px solid #ffffff' : '';
  }

  //card section
  get cardBgColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#FFFFFF';
  }
  get cardTagTextColor() {
    return this.isDarkTheme ? '#FFFFFF' : '#37517e';
  }
  get cardTagBorderColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#37517e';
  }
  get cardDetailsBgColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#37517e';
  }
  get cardDetailsTextColor() {
    return this.isDarkTheme ? '#37517e' : '#EEEEEE';
  }

  //about section
  get aboutBgColor() {
    return this.isDarkTheme ? '#212121' : '';
  }
  get aboutTextColor() {
    return this.isDarkTheme ? '#d1d5db' : '#7688A6';
  }

  //service section
  get serviceElementBgColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#37517e';
  }
  get serviceElementIconColor() {
    return this.isDarkTheme ? '#37517e' : '#EEEEEE';
  }

  //contact section
  get contactBgColor() {
    return this.isDarkTheme ? 'hsla(0,1%,23%,0.6)' : 'hsla(0,0%,100%,0.6)';
  }
  get contactTextErrorColor() {
    return this.isDarkTheme ? '#e77681' : '#dc3545';
  }
  get contactTextContactColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#37517e';
  }
  get contactSubTitleTextColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#212121';
  }
  get contactInputTextBorderColor() {
    return this.isDarkTheme ? '2px solid #000000' : '2px solid #37517e';
  }

  //footer section
  get footerBgColor() {
    return this.isDarkTheme ? '#000000' : '';
  }
  get footerTitleColor() {
    return this.isDarkTheme ? '#EEEEEE' : '#000000';
  }
  get footerBorderColor() {
    return this.isDarkTheme ? '2px solid #EEEEEE' : '';
  }
}

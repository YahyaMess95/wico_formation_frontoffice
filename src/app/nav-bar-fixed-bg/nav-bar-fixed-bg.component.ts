import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { AuthenticationCardComponent } from '../authentication-card/authentication-card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppStateService } from '../app-services/app-state.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-fixed-bg',
  templateUrl: './nav-bar-fixed-bg.component.html',
  styleUrls: ['./nav-bar-fixed-bg.component.css'],
})
export class NavBarFixedBgComponent implements OnInit {
  showFixedNavBar: boolean = false;
  constructor(
    public modalService: NgbModal,
    private el: ElementRef,
    private renderer: Renderer2,
    private appStateService: AppStateService,
    private router: Router
  ) {
    this.activeSection = 'home';
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFixedNavBar = this.shouldShowFixedNavBar(event.url);
      }
    });
    this.renderer.listen('document', 'click', (event) => {
      const isClickedInside = this.el.nativeElement.contains(event.target);

      if (!isClickedInside) {
        this.isDropdownOpen = false; // Close the dropdown
      }
    });
    this.appStateService.activeSection$.subscribe((section) => {
      this.activeSection = section;
    });
  }

  shouldShowFixedNavBar(url: string): boolean {
    if (url.includes('/training')) {
      return this.showFixedNavBar;
    } else {
      return !this.showFixedNavBar;
    }
  }

  ngOnDestroy() {
    this.renderer.destroy();
  }
  isScrolled = false;
  logo = 'logo-b';
  showMenu = false;
  activeSection: string;

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

  toggleNavbar() {
    this.showMenu = !this.showMenu;
    this.isScrolled = true;
    this.logo = this.isScrolled ? 'logo' : 'logo-b';
  }
  click(Id: string) {
    this.activeSection = Id;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  openPopup() {
    this.modalService.open(AuthenticationCardComponent, {
      size: 'xl',
      modalDialogClass: 'modal-dialog-centered',
    });
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown() {
    this.isDropdownOpen = false;
  }
}

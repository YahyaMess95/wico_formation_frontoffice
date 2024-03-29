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
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  constructor(
    public modalService: NgbModal,
    private el: ElementRef,
    private renderer: Renderer2,
    private appStateService: AppStateService,
    public themeService: ThemeService
  ) {
    this.activeSection = 'home';
  }
  ngOnInit(): void {
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

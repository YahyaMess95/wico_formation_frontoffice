import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppStateService } from '../app-services/app-state.service';
import { ThemeService } from '../theme.service';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements AfterViewInit {
  routpath: boolean = true;
  isLoading: boolean = true;
  activeSection: string;
  formationdetails: any[] = [];
  private swiperInstance: Swiper | undefined;

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeSwiper();
        this.handleResponsiveBehavior();
      });
    }
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private appStateService: AppStateService,
    public themeService: ThemeService
  ) {
    this.loadFormations();
    this.activeSection = 'home';
  }

  private initializeSwiper(): void {
    if (!this.swiperContainer || !this.swiperContainer.nativeElement) {
      console.error('Swiper container element not found.');
      return;
    }

    this.swiperInstance = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  private handleResponsiveBehavior(): void {
    // Use Angular's breakpointObserver to detect changes in screen size
    this.breakpointObserver
      .observe(['(min-width: 768px)', '(min-width: 640px)'])
      .subscribe((result) => {
        if (this.swiperInstance) {
          this.updateSlidesPerView(result);
        }
      });
  }

  private updateSlidesPerView(breakpointState: any): void {
    // Update slidesPerView based on the detected breakpoint
    if (breakpointState.breakpoints['(min-width: 768px)']) {
      this.swiperInstance!.params.slidesPerView = 3; // Large screens
    } else if (breakpointState.breakpoints['(min-width: 640px)']) {
      this.swiperInstance!.params.slidesPerView = 2; // Medium screens
    } else {
      this.swiperInstance!.params.slidesPerView = 1; // Small screens
    }

    // Update Swiper
    this.swiperInstance!.update();
  }
  goToNextSlide(): void {
    if (this.swiperInstance) {
      this.swiperInstance.slideNext();
    }
  }
  goToPrevSlide(): void {
    if (this.swiperInstance) {
      this.swiperInstance.slidePrev();
    }
  }

  goToTrainingPage() {
    this.appStateService.setActiveSection('training');
    this.router.navigate(['/training']);
  }

  ngOnInit() {
    this.route.url.subscribe(([url]) => {
      const path = url == undefined ? 'home' : url.path;
      this.formationdetails =
        path == 'home'
          ? this.formationdetails.slice(0, 4)
          : this.formationdetails;
      this.routpath = path == 'home' ? true : false;
      this.activeSection = path;
    });
    // console.log(this.formationdetails);
  }

  get textColor() {
    return this.themeService.textColor;
  }

  get bgColor() {
    return this.themeService.bgColor;
  }

  get cardDetailsTextColor() {
    return this.themeService.cardDetailsTextColor;
  }

  click(Id: string) {
    this.activeSection = Id;
  }

  loadFormations() {
    this.appStateService.getAllSessions(0, 0).subscribe(
      (response) => {
        const sessiondetails = response.session;
        const formationPromises: Promise<any>[] = [];

        sessiondetails.forEach((session: any) => {
          session.formations.forEach((formationId: string) => {
            const formationPromise = new Promise((resolve, reject) => {
              this.appStateService.getOneFormation(formationId).subscribe(
                (formationResponse) => {
                  this.appStateService.getPhoto(session.photo).subscribe(
                    (photoData: any) => {
                      resolve({
                        path: photoData, // Assuming photoData is already a data URL
                        title: formationResponse.formation.name,
                        begin: new Date(session.datedeb).toLocaleDateString(),
                        end: session.endDate,
                        description: formationResponse.formation.description,
                        hours: session.hoursPerDay,
                        location: session.type,
                        tags: formationResponse.formation.tags,
                      });
                    },
                    (error: any) => {
                      console.error('Error fetching user photo:', error);
                      reject(error);
                    }
                  );
                },
                (error: any) => {
                  console.error(
                    `Error retrieving formation with ID ${formationId}:`,
                    error
                  );
                  reject(error);
                }
              );
            });
            formationPromises.push(formationPromise);
          });
        });

        Promise.all(formationPromises)
          .then((formationDetails: any[]) => {
            this.formationdetails = formationDetails.sort(
              (a, b) => Date.parse(b.begin) - Date.parse(a.begin)
            );
            this.isLoading = false;
          })
          .catch((error) => {
            console.error('Error processing formations:', error);
          });
      },
      (error: any) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  // formationdetails = [
  //   {
  //     path: '../../assets/images/AngularJs.png',
  //     title: 'AngularJS',
  //     begin: '06/01/2023',
  //     end: '16/01/2023',
  //     description:
  //       'Master the fundamentals of AngularJS, the powerful JavaScript framework, in this comprehensive training. Learn to build dynamic and responsive web applications using declarative programming techniques.',
  //     hours: '2h/j',
  //     location: 'Online',
  //     tags: ['JavaScript', 'AngularJS', 'TypeScript', 'HTML', 'CSS', 'SCSS'],
  //   },
  // ].sort((a, b) => Date.parse(b.begin) - Date.parse(a.begin));
}

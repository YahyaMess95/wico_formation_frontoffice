import { Component, Input } from '@angular/core';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  showOverlay: boolean = false;
  activeSection: string;
  constructor(
    public modalService: NgbModal,
    private route: ActivatedRoute,
    public themeService: ThemeService
  ) {
    this.activeSection = 'home';
  }
  routpath: boolean = true;
  @Input() form_info: any;
  ngOnInit() {
    this.route.url.subscribe(([url]) => {
      const path = url == undefined ? 'home' : url.path;

      this.routpath = path == 'home' ? true : false;
      this.activeSection = path;
    });
  }

  get bgColor() {
    return this.themeService.bgColor;
  }
  get textColor() {
    return this.themeService.textColor;
  }
  splitTags(tagsString: string): string[] {
    // Split the tags string by spaces or commas
    return tagsString.split(/[,\s]+/);
  }

  openPopup(form_info: any) {
    const modalRef = this.modalService.open(CardDetailsComponent, {
      size: 'xl',
      modalDialogClass: 'modal-dialog-centered',
    });
    modalRef.componentInstance.form_info = form_info;
  }
}

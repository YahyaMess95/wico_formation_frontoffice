import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css',
})
export class CardDetailsComponent {
  @Input() form_info: any;
  constructor(public activeModal: NgbActiveModal) {}
  splitTags(tagsString: string): string[] {
    // Split the tags string by spaces or commas
    return tagsString.split(/[,\s]+/);
  }
}

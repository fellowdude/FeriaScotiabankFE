import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { reduce } from 'rxjs/operators';
import { IAccordion } from 'src/app/models/static-pages.model';

@Component({
  selector: 'app-single-accordion',
  templateUrl: './single-accordion.component.html',
  styleUrls: ['./single-accordion.component.scss'],
})
export class SingleAccordionComponent implements OnInit {
  @Input() accordion: IAccordion;
  @Input() closedColor: string = 'grey-dark';
  @Input() openedColor: string = 'black-light';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  toggleAccordion(): void {
    this.accordion.opened = !this.accordion.opened;
  }

  safeHtml(text: string): SafeHtml{
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}

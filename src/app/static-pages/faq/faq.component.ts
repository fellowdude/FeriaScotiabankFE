import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAccordion } from 'src/app/models/static-pages.model';
import { IFAQResolver } from 'src/app/resolvers/static-pages/faq.resolver';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IFAQResolver;
  }
  content: IStaticPageBackend;
  accordions: IAccordion[];
  accordionOpenedColors = [
    'purple',
    'blue',
    'green',
    'orange',
  ];
  accordionClosedColors = [
    'purple-light',
    'blue-light',
    'green-light',
    'orange-light',
  ]

  constructor(private route: ActivatedRoute, private staticPagesTransform: StaticPagesTransformService) {}

  ngOnInit(): void {
    this.content = this.resolvedData.content;
    this.accordions = this.staticPagesTransform.accordionStructure(this.content.content_questions);
  }

}

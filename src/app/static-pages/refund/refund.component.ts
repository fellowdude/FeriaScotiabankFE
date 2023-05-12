import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IComplexCard } from 'src/app/models/static-pages.model';
import { IRefundResolver } from 'src/app/resolvers/static-pages/refund.resolver';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss'],
})
export class RefundComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IRefundResolver;
  }

  rawContent: IStaticPageBackend;
  text: SafeHtml;
  cards: IComplexCard[] = [];

  constructor(
    private route: ActivatedRoute,
    private staticPagesTransformService: StaticPagesTransformService
  ) {}

  ngOnInit(): void {
    this.rawContent = this.resolvedData.content;
    /* this.cards = this.staticPagesTransformService.complexCardsStructure(
      this.rawContent.content_cards
    ); */

    this.text = this.staticPagesTransformService.textHTMLStructure(
      this.rawContent.content_information
    );
  }
}

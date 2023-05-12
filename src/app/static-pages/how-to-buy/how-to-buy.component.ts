import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHowToBuyResolver } from 'src/app/resolvers/static-pages/how-to-buy.resolver';
import { IStaticPageBackend } from 'src/app/services/static-page.service';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service'
import { ISimpleCard, IHTMLText } from 'src/app/models/static-pages.model';
import { SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-how-to-buy',
  templateUrl: './how-to-buy.component.html',
  styleUrls: ['./how-to-buy.component.scss']
})
export class HowToBuyComponent implements OnInit {

  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IHowToBuyResolver;
  }

  rawContent: IStaticPageBackend;
  cards: ISimpleCard[] = [];
  text: SafeHtml;

  constructor(private route: ActivatedRoute, private staticPagesTransformService: StaticPagesTransformService) {}

  ngOnInit(): void {
    this.rawContent = this.resolvedData.content;
    this.cards = this.staticPagesTransformService.simpleCardsStructure(this.rawContent.content_cards);
    this.text = this.staticPagesTransformService.textHTMLStructure(this.rawContent.content_information);
  }

}

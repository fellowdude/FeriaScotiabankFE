import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { IComplexCard } from 'src/app/models/static-pages.model';
import { IBioSecurityResolver } from 'src/app/resolvers/static-pages/bio-security.resolver';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-bio-security',
  templateUrl: './bio-security.component.html',
  styleUrls: ['./bio-security.component.scss'],
})
export class BioSecurityComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IBioSecurityResolver;
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
    this.cards = this.staticPagesTransformService.complexCardsStructure(
      this.rawContent.content_cards
    );
  }
}

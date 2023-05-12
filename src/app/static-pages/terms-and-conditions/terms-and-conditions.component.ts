import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ITermsAndConditionsResolver } from 'src/app/resolvers/static-pages/terms-and-conditions.resolver';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as ITermsAndConditionsResolver;
  }
  rawContent: IStaticPageBackend;
  text: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private staticPagesTransformService: StaticPagesTransformService
  ) {}

  ngOnInit(): void {
    this.rawContent = this.resolvedData.content;
    this.text = this.staticPagesTransformService.textHTMLStructure(
      this.rawContent.content_information
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  IPayMethodResolver,
  IPayMethodFE,
} from 'src/app/resolvers/static-pages/pay-method.resolver';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.component.html',
  styleUrls: ['./pay-method.component.scss'],
})
export class PayMethodComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IPayMethodResolver;
  }
  rawContent: IPayMethodFE;
  onlineRecomendations: SafeHtml;
  securityRecomendations: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private staticPagesTransformService: StaticPagesTransformService
  ) {}

  ngOnInit(): void {
    this.rawContent = this.resolvedData.content;
    this.onlineRecomendations = this.staticPagesTransformService.textHTMLStructure(
      this.rawContent.content_online_recomendations
    );
    this.securityRecomendations = this.staticPagesTransformService.textHTMLStructure(
      this.rawContent.content_security_recomendations
    );
  }
}

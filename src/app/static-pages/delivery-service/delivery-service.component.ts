import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IDeliveryServiceResolver } from 'src/app/resolvers/static-pages/delivery-service.resolver';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-delivery-service',
  templateUrl: './delivery-service.component.html',
  styleUrls: ['./delivery-service.component.scss']
})
export class DeliveryServiceComponent implements OnInit {

  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IDeliveryServiceResolver;
  }

  rawContent: IStaticPageBackend;
  text: SafeHtml;

  constructor(private route: ActivatedRoute, private staticPagesTransformService: StaticPagesTransformService) {}

  ngOnInit(): void {
    this.rawContent = this.resolvedData.content;
    this.text = this.staticPagesTransformService.textHTMLStructure(this.rawContent.content_information);
  }

}

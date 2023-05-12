import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICustomerServiceResolver } from 'src/app/resolvers/static-pages/customer-service.resolver';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as ICustomerServiceResolver;
  }

  rawContent: IStaticPageBackend;
  text: SafeHtml;

  constructor(private route: ActivatedRoute, private staticPagesTransformService: StaticPagesTransformService) {}

  ngOnInit(): void {
    this.rawContent = this.resolvedData.content;
    this.text = this.staticPagesTransformService.textHTMLStructure(this.rawContent.content_information);
  }

}

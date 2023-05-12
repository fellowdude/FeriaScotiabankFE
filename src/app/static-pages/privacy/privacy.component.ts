import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';
import {IPrivacyResolver } from 'src/app/resolvers/static-pages/privacy.resolver';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IPrivacyResolver;
  }
  rawContent: IStaticPageBackend;
  text: SafeHtml;

  constructor(private route: ActivatedRoute, private staticPagesTransformService: StaticPagesTransformService) {}
  ngOnInit(): void {
    this.rawContent = this.resolvedData.content;
    this.text = this.staticPagesTransformService.textHTMLStructure(this.rawContent.content_information);
  }

}

import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IForm } from 'src/app/models/form.model';
import { IContactUsResolver } from 'src/app/resolvers/static-pages/contact-us.resolver';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';
import { sellers, ISeller } from './contact-us.static';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IContactUsResolver;
  }

  rawContent: IStaticPageBackend;
  text: SafeHtml;
  form: IForm;
  sellers: ISeller[] = sellers;

  constructor(
    private route: ActivatedRoute,
    private staticPagesTransformService: StaticPagesTransformService
  ) {}

  ngOnInit(): void {
    this.rawContent = this.resolvedData.content;
    this.text = this.staticPagesTransformService.textHTMLStructure(
      this.rawContent.content_information
    );
    this.form = this.staticPagesTransformService.formStructure(
      this.rawContent.content_contactenos,
      null,
      'Enviar mensaje'
    );
  }
}

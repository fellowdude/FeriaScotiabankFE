import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IForm } from 'src/app/models/form.model';
import { IComplaintsBookResolver } from 'src/app/resolvers/static-pages/complaints-book.resolver';
import { StaticPagesTransformService } from 'src/app/services/internal/static-pages-transform.service';
import { IStaticPageBackend } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-complaints-book',
  templateUrl: './complaints-book.component.html',
  styleUrls: ['./complaints-book.component.scss'],
})
export class ComplaintsBookComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IComplaintsBookResolver;
  }
  rawContent: IStaticPageBackend;
  text: SafeHtml;
  form: IForm;

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
      this.rawContent.content_libro_de_reclamaciones,
      null,
      'Enviar mensaje'
    );
  }
}

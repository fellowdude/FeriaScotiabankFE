import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StaticPageService {
  constructor(private api: ApiService) {}

  getPublicStaticPage(slug: string): Observable<any> {
    return this.api.get(`static-page/data/${slug}`);
  }

  sendFormInfo(formInfo: any): Observable<any> {
    return this.api.post(`email/send-email-template`, formInfo);
  }
}

export interface IStaticPageBackend {
  content_cards?: any;
  content_information?: any;
  content_questions?: any;
  content_form?: any;
  content_banner?: any;

  content_contactenos?:any; // originally content_form (should be)
  content_libro_de_reclamaciones?:any; // originally content_form (should be)
}

export interface IStaticPageHomeBackend {
  content_header?: any;
  content_client?: any;
  content_payment?: any;
}

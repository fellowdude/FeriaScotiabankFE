import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IStaticPageBackend,
  StaticPageService,
} from '../../services/static-page.service';

@Injectable({
  providedIn: 'root',
})
export class PayMethodResolver implements Resolve<IPayMethodResolver> {
  constructor(private staticPageService: StaticPageService) {}

  resolve(): Observable<IPayMethodResolver> {
    return zip(this.staticPageService.getPublicStaticPage('pay_method')).pipe(
      map(([content]) => ({
        content,
      }))
    );
  }
}

export interface IPayMethodResolver {
  content: IPayMethodFE;
}

export interface IPayMethodFE {
  content_banner?: any;
  content_online_recomendations?: any;
  content_security_recomendations?: any;
}

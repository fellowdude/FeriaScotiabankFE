import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class FAQResolver implements Resolve<IFAQResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<IFAQResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('faq'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface IFAQResolver{
  content: IStaticPageBackend
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class TermsAndConditionsResolver implements Resolve<ITermsAndConditionsResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<ITermsAndConditionsResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('terms_and_conditions'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface ITermsAndConditionsResolver{
  content: IStaticPageBackend
}

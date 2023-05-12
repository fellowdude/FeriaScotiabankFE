import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class ContactUsResolver implements Resolve<IContactUsResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<IContactUsResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('contact_us'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface IContactUsResolver{
  content: IStaticPageBackend
}

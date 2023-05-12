import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class ComplaintsBookResolver implements Resolve<IComplaintsBookResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<IComplaintsBookResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('complaints_book'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface IComplaintsBookResolver{
  content: IStaticPageBackend
}

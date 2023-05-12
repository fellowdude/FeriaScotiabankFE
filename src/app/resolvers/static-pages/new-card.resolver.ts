import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class NewCardResolver implements Resolve<INewCardResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<INewCardResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('new_card'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface INewCardResolver{
  content: IStaticPageBackend
}

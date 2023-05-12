import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class BioSecurityResolver implements Resolve<IBioSecurityResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<IBioSecurityResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('bio_security'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface IBioSecurityResolver{
  content: IStaticPageBackend
}

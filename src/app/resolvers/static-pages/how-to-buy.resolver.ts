import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class HowToBuy implements Resolve<IHowToBuyResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<IHowToBuyResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('how_to_buy'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface IHowToBuyResolver{
  content: IStaticPageBackend
}

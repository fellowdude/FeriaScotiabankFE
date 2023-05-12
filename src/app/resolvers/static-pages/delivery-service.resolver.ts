import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class DeliveryServiceResolver implements Resolve<IDeliveryServiceResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<IDeliveryServiceResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('delivery_service'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface IDeliveryServiceResolver{
  content: IStaticPageBackend
}

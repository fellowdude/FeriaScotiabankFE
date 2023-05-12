import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceResolver implements Resolve<ICustomerServiceResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<ICustomerServiceResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('customer_service'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface ICustomerServiceResolver{
  content: IStaticPageBackend
}

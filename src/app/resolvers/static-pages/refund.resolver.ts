import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStaticPageBackend, StaticPageService } from '../../services/static-page.service'

@Injectable({
  providedIn: 'root',
})
export class RefundResolver implements Resolve<IRefundResolver> {

  constructor( private staticPageService: StaticPageService ) { }

  resolve(): Observable<IRefundResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('refund'),
    ).pipe(
      map(([content]) => ({
        content
      }))
    );
  }

}

export interface IRefundResolver{
  content: IStaticPageBackend
}

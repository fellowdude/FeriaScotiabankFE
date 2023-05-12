import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IStaticPageBackend,
  StaticPageService,
} from '../../services/static-page.service';

@Injectable({
  providedIn: 'root',
})
export class PrivacyResolver implements Resolve<IPrivacyResolver> {
  constructor(private staticPageService: StaticPageService) {}

  resolve(): Observable<IPrivacyResolver> {
    return zip(
      this.staticPageService.getPublicStaticPage('privacy_policy')
    ).pipe(
      map(([content]) => ({
        content,
      }))
    );
  }
}

export interface IPrivacyResolver {
  content: IStaticPageBackend;
}

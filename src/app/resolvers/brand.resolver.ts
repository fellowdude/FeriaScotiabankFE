import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CategoryService,
  IBrandBackend,
  ICategoryBackend,
} from '../services/category.service';

@Injectable({
  providedIn: 'root',
})
export class BrandResolver implements Resolve<IBrandPage> {
  constructor(private catService: CategoryService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IBrandPage> {
    const friendlyUrl = route.paramMap.get('friendlyUrl');
    const brandFriendlyUrl = route.paramMap.get('brandFriendlyUrl');
    return zip(
      this.catService.getBrandElement(friendlyUrl, brandFriendlyUrl)
    ).pipe(
      map(([brandElement]) => {
        const brandPage: IBrandPage = {
          _brand: brandElement.entity,
          category: brandElement.category,
          isBrandPage: true,
        };
        this.catService.urlAttachment = brandElement.url_attachment;
        return brandPage;
      })
    );
  }
}

export interface IBrandPage {
  category: ICategoryBackend;
  _brand: IBrandBackend;
  isBrandPage: boolean;
}

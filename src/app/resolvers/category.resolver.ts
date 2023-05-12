import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CategoryService,
  IBrandBackend,
  ICategoryBackend,
} from '../services/category.service';
import { decode } from 'urlencode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<ICategoryPage> {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private catService: CategoryService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ICategoryPage> {
    const friendlyUrl = route.paramMap.get('friendlyUrl');
    const filter = route.queryParamMap.get('subcategory');
    this.catService.activeFilter = decode(filter);
    return zip(this.catService.getCategoryElement(friendlyUrl)).pipe(
      map(([categoryElement]) => {
        const catPage: ICategoryPage = {
          category: categoryElement.entity,
          _brands: categoryElement.brands.data,
          isBrandPage: false,
        };
        this.catService.urlAttachment = categoryElement.url_attachment;
        if( isPlatformBrowser(this.platformId)){
          localStorage.setItem('url', categoryElement.url_attachment)
        }
        
        
        return catPage;
      })
    );
  }
}

export interface ICategoryPage {
  category: ICategoryBackend;
  _brands: IBrandBackend[];
  isBrandPage: boolean;
}

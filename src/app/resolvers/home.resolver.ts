import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProductItem } from '../models/product.model';
import { ProductService } from '../services/product.service';
import {
  CategoryService,
  ICategoryBackend,
} from '../services/category.service';
import {
  IStaticPageHomeBackend,
  StaticPageService,
} from '../services/static-page.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HomeResolver implements Resolve<IHomePage> {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private catService: CategoryService,
    private productService: ProductService,
    private staticService: StaticPageService
  ) {}
  resolve(): Observable<IHomePage> {
    return zip(
      this.catService.getCategoryList(),
      this.productService.getFeaturedProducts(),
      this.staticService.getPublicStaticPage('home')
    ).pipe(
      map(([categories, productsFeat, content]) => {
        const homePage: IHomePage = {
          categories: categories.data,
          productsFeat,
          content,
        };
        this.catService.urlAttachment = categories.url_attachment;
        if( isPlatformBrowser(this.platformId)){
          localStorage.setItem('url', categories.url_attachment)
        }
        
        return homePage;
      })
    );
  }
}

export interface IHomePage {
  content: IStaticPageHomeBackend;
  categories: ICategoryBackend[];
  productsFeat: IProductItem[];
}

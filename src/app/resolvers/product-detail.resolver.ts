import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProductBackend, ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailResolver implements Resolve<IProductDetailPage> {
  constructor(private productService: ProductService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IProductDetailPage> {
    const friendlyUrl = route.paramMap.get('friendlyUrl');
    return zip(
      this.productService.getProduct(friendlyUrl),
      this.productService.getFeaturedProducts(16)
    ).pipe(map(([product, productsFeat]) => ({ product, productsFeat })));
  }
}

export interface IProductDetailPage {
  product: IProductBackend;
  productsFeat: IProductBackend[];
}

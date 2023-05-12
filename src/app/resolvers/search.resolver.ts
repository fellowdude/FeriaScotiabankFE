import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProductBackend, ProductService } from '../services/product.service';
import { ISearchBackend, SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchResolver implements Resolve<ISearchPage> {
  constructor(private productService: ProductService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ISearchPage> {
    const search = route.queryParamMap.get('filter');
    return zip(this.productService.getProducts({}, null, null, search)).pipe(
      map(([searchResult]) => ({ searchResult }))
    );
  }
}

export interface ISearchPage {
  searchResult: IProductBackend[];
}

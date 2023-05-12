import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { IProductBackend } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private api: ApiService) {}

  searchCatalogProduct(searchParam: any): Observable<ISearchBackend> {
    const params = this.api.createHttpParams({
      search: searchParam,
      page: 1,
      quantity: 8,
    });
    return this.api.get('product/search', params);
  }
}

export interface ISearchBackend {
  data: IProductBackend[];
  isSupplier: boolean;
  quantityPage: number;
  totalItem: number;
  url_attachment: string;
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  category: ICategoryBackend;
  brand: IBrandBackend;
  urlAttachment = '';
  activeFilter: string = '';

  constructor(private api: ApiService) {}

  getCategoryList(): Observable<ICategoryListBackend> {
    return this.api.get('category/list-category-full/tienda');
  }

  getCategoryElement(category: string): Observable<ICategoryElementBackend> {
    return this.api.get(`category/category-list-element/${category}/null/null`);
  }
  getBrandElement(
    category: string,
    brand: string
  ): Observable<IBrandElementBackend> {
    return this.api.get(
      `category/category-list-element/${category}/marca/${brand}`
    );
  }
}

export interface ICategoryListBackend {
  data: Array<ICategoryBackend>;
  image_category: string;
  url_attachment: string;
}

export interface ICategoryBackend {
  name: string;
  friendly_url: string;
  filters: Array<IFilterBackend>;
  brands: any;
  url_attachment: string;
  image_banner: string;
  image_link: string;
  _id: string;
}

export interface IFilterBackend {
  filter: string;
  values: Array<string>;
  _id: string;
}

export interface ICategoryElementBackend {
  entity: ICategoryBackend;
  brands: IBrandListBackend;
  url_attachment: string;
}

export interface IBrandListBackend {
  data: Array<IBrandBackend>;
}

export interface IBrandBackend {
  _id: string;
  name: string;
  description: string;
  friendly_url: string;
  image_link: string;
  image_logo_link: string;
  image_banner: string;
  image_logo_banner: string;
}

export interface IBrandElementBackend {
  entity: IBrandBackend;
  category: ICategoryBackend;
  url_attachment: string;
}

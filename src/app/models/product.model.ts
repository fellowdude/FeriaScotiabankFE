import { ISupplierInfo } from './supplier-order.model';

export interface IProductItem {
  stock: number;
  name: string;
  brand: any;
  image_cover: string;
  friendly_url: string;
  special_price: number;
  price: number;
}

export interface IProductDetail {
  stock: number;
  name: string;
  brand: any;
  image_cover: string;
  friendly_url: string;
  special_price: number;
  price: number;
  supplier_delivery?: ISupplierInfo;
  currency?: string;
  list_method?: Array<any>;
}

export type ProductItemType = 'simple' | 'star' | 'discount' | 'scotia';

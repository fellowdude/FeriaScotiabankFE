import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { products } from '../mockups/product.mockup';
import { IBrandBackend } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  getFeaturedProducts(quantity = 20): Observable<IProductBackend[]> {
    const params = this.api.createHttpParams({
      limit: quantity,
    });
    return this.api.get(`product/featured/`, params);
  }

  getProducts(
    filters: any = {},
    category_id: string,
    sort: any = null,
    search: any = null
  ): Observable<IProductBackend[]> {
    const params = this.api.createHttpParams({
      data: { filters, category_id, sort, search },
    });
    console.log({ data: { filters, category_id, sort, search } });
    return this.api.get(`product/category-filter`, params);
  }

  getProduct(friendlyUrl: string): Observable<IProductBackend> {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('jwt')) {
      return this.api.getLogged(`product/detail/${friendlyUrl}`);
    } else {
      return this.api.get(`product/detail/${friendlyUrl}`);
    }
  }
}

export interface IProductBackend {
  _id: string;
  request: Request;
  is_pack: boolean;
  is_variation: boolean;
  has_dedication: boolean;
  stock: number;
  deleted: boolean;
  archive: boolean;
  active: boolean;
  images_link: string[];
  videos_link: any[];
  giftcard_available: boolean;
  categories: Category[];
  shipping_allowed: boolean;
  shipping_methods: any[];
  featured: boolean;
  additional_variables: any[];
  show_special_offer: boolean;
  show_in_stock_out: boolean;
  last_unit: boolean;
  pending_request: boolean;
  list_method: ListMethod[];
  active_discount: boolean;
  countInWishlist: number;
  related_products: any[];
  product_variation: any[];
  tenant: string;
  SKU: string;
  name: string;
  type: string;
  brand: Brand;
  group: Group;
  currency: Currency;
  supplier: string;
  filter_values: FilterValue[];
  price: number;
  special_price: number;
  friendly_url: string;
  image_cover: string;
  request_history: any[];
  create_date: Date;
  ranking: any[];
  pack_products: any[];
  __v: number;
  detail_list: DetailList[];
  discount_amount: null;
  end_date_offer: null;
  image_banner: string;
  image_banner_mobile: string;
  image_cover_mobile: string;
  image_logo_banner: string;
  image_logo_banner_mobile: string;
  initial_date_offer: null;
  model_product: null;
  product_father: null;
  rules_admin: null;
  small_name: string;
  special_offer: null;
  supplier_delivery: SupplierDelivery;
  taxBuy: null;
  taxSent: null;
  type_discount: string;
  url_nm_travel: string;
  update_by: string;
  update_date: Date;
  is_product_variation_select: boolean;
  variation_father: any[];
  variations: any[];
  father_base_variation: string;
  installation: number;
  type_variation: null;
  warranty: number;
  searchName: string;
  ratingCount: number;
  average: number;
  url_attachment: string;
  productInWishList: boolean;
}

export interface Brand {
  _id: string;
  name: string;
  friendly_url: string;
  image_banner: string;
  image_logo_banner: string;
  galery_image: any[];
}

export interface Category {
  _id: string;
  name: string;
  friendly_url: string;
  brandFlow: boolean;
  productFlow: boolean;
}

export interface Currency {
  _id: string;
  value: string;
  ref1: string;
}

export interface DetailList {
  title: string;
  description: string;
}

export interface FilterValue {
  _id: string;
  filter_id: string;
  stringValue: string;
}

export interface Group {
  _id: string;
  active: boolean;
  deleted: boolean;
  name: string;
  typeGroupCategory: string;
  friendly_url: string;
  position: number;
  create_by: string;
  create_date: Date;
  __v: number;
}

export interface ListMethod {
  _id: string;
  available: Available[];
  active: boolean;
  code: null;
  codeERP: null;
  description: string;
  id_supplier: string;
  intervalTime: IntervalTime;
  maxDayDelivery: null;
  maxDaySchedule: null;
  message: null;
  name: string;
  rangeMax: number;
  rangeMin: number;
  type: string;
  tenant: string;
  create_date: Date;
  __v: number;
  update_by: string;
  update_date: Date;
}

export interface Available {
  name: string;
  active: boolean;
  value: number;
  ini_hour: Date;
  end_hour: Date;
}

export interface IntervalTime {
  time: Date;
}

export interface Request {
  approvals: any[];
  create_date: Date;
}

export interface SupplierDelivery {
  __v?: number;
  _id?: string;
  active?: boolean;
  can_sell?: boolean;
  code?: string;
  deleted?: boolean;
  delivery_postventa?: string;
  description?: string;
  email?: string;
  email_sales?: string;
  entry?: null;
  group?: null;
  image_link?: string;
  is_distribution_supplier?: boolean;
  list_brand?: string[];
  list_supplier_Delivery?: string[];
  max_distribution?: null;
  method_send?: string[];
  name?: string;
  phone_number?: string;
  post_sell_representative?: string;
  post_sell_representative_name?: string;
  visible_categories?: string[];
  visible_category_groups?: string[];
}

export interface IFilterQueryBackend {
  value:
    | IFilterQueryValueToggle
    | IFilterQueryValueRange
    | IFilterQueryValueBoolean;
  bindedTo?: 'marca' | 'precio' | '';
  // bindedTo (''|null) params
  used?: boolean;
  type?: 'checkbox' | 'radio' | 'range' | 'boolean';
  filter_id?: string;
}

export type IFilterQueryValueToggle = {
  toggle: boolean;
  name: string;
}[];
export type IFilterQueryValueRange = [number, number]; // [min,max]
export type IFilterQueryValueBoolean = [boolean];

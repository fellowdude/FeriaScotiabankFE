import { IUserProfileData } from './user-profile.model';
import { IMethodSend } from './method-send.model';
import { IProductDetail } from './product.model';

export interface IOrderDetailSupplierProduct{
  image_product: string;
  price: number;
  total_price: number;
  quantity: number;
  name_product: string;
  _id?: string;
  id_product: string;
  info_product?: IProductDetail;
  method_send?: Array<string>;
  delivery_method_price?: number;
  brand: string;
  url_attachment?: string;
}

export interface IOrderDetailSupplier{
  name: string;
  delivery_price: number;
  delivery_time: string;
  id?: string;
  products: Array<IOrderDetailSupplierProduct>;
  delivery: number;
  total: number;
  mail?: string;
  phone?: string;
}

export interface IOrderDetail{
  code: string;
  currency: string;
  state: string;
  stateRef: string;
  id: string;
  date: Date;
  delivery: number;
  discount: number;
  subtotal: number;
  total: number;
  method_send: IMethodSend;
  type_payment: string;
  user: IUserProfileData;
  detail: Array<IOrderDetailSupplier>;
}

export interface IOrderItem{
  amount_total: number;
  code: string;
  currency: string;
  state: string;
  id: string;
  date: Date;
  product_count: number;
}

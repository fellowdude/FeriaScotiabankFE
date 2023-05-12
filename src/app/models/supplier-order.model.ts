import { ICartItem } from "./cart-item.model";
import { IMethodSend } from './method-send.model';

export interface ISupplierInfo {
  name: string;
  email?: string;
  email_sales?: string;
  phone_number?: string;
  post_sell_representative?: string;
  post_sell_representative_name?: string;
  _id?: string;
  method_send?: IMethodSend;
}
export interface ISupplierOrder {
  name: string;
  delivery_price: number;
  delivery_time: string;
  products: Array<ICartItem>;
  id?: string;
}

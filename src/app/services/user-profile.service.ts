import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMethodSend } from '../models/method-send.model';
import { IProductDetail } from '../models/product.model';
import { IUserProfileData } from '../models/user-profile.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private api: ApiService) { }

  userData(): Observable<any>{
    return this.api.getLogged('user/profile-info');
  }

  userDataUpdate(updateData: any): Observable<any>{
    return this.api.putLogged('user', updateData);
  }

  userAddressList(): Observable<any>{
    return this.api.getLogged('user/customer-address');
  }

  createAddress(addressBody: any): Observable<any>{
    return this.api.postLogged(`user-address/`, addressBody);
  }

  updateAddress(addressBody: any): Observable<any>{
    return this.api.putLogged(`user-address/${addressBody._id}`, addressBody);
  }

  deleteAddress(addressId: any): Observable<any>{
    return this.api.deleteLogged(`user-address/${addressId}`);
  }

  getTypeAddress() {
    return this.api.getLogged('user/available-type-address');
  }

  userOrders(): Observable<Array<IOrderBackend>>{
    return this.api.getLogged('order/user');
  }

  userOrderDetail(idOrder: string): Observable<IOrderDetailBackend>{
    return this.api.getLogged(`order/${idOrder}`);
  }
}

export interface IOrderBackend{
  amount_total: number;
  code: string;
  create_date: string;
  currency: {
    value: string;
  };
  status_order: {
    value: string;
  };
  _id: string;
  product_count: number;
}


export interface IOrderDetailBackend{
  amount_total: number;
  amount_subtotal: number;
  amount_delivery: number;
  amount_discount: number;
  code: string;
  create_date: string;
  currency: {
    value: string;
  };
  status_order: {
    value: string;
    ref1: string;
  };
  _id: string;
  detail: Array<IOrderDetailItemBackend>;
  method_send_id: IMethodSend;
  type_payment: string;
  user_id: IUserProfileData;
  url_attachment?:string;
}

export interface IOrderDetailItemBackend{
  _id: any,
  product_price: number,
  discount_price: number,
  amount_subtotal: number,
  amount_total: number,
  delivery: number,
  quantity: number,
  range_day: string,
  supplier_delivery: any,
  method_id: IMethodSend,
  product_name: string,
  friendly_url: string,
  product_id?: IProductDetail,
}

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem } from '../models/cart-item.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private api: ApiService) { }

  cartList(state: number = 0, info: any = {}): Observable<any> {
    let params = new HttpParams().append('state',String(state)).append('info',JSON.stringify(info));
    return this.api.getLogged('shopping-cart/', params);
  }

  createCartItem(product: any): Observable<any> {
    return this.api.postLogged('shopping-cart/', product);
  }

  updateCartItem(product: any): Observable<any> {
    return this.api.putLogged(`shopping-cart/${product.id_product}`, product);
  }

  deleteCartItem(idCartItem: any, quantity: number = 1): Observable<any> {
    let params = new HttpParams().append('quantity',String(quantity));
    return this.api.deleteLogged(`shopping-cart/${idCartItem}`, params);
  }

  cartSize(): Observable<any> {
    return this.api.getLogged('shopping-cart/total-item')
  }
}

export interface ICartBE{
  subtotal: number;
  infoShoppingCart: Array<ICartItem>;
}

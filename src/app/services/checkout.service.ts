import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderBody } from '../models/order-body.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private api: ApiService) { }

  getDeliveryPrices(): Observable<any>{
    return this.api.getLogged('order/delivery-price');
  }

  createOrder(orderBody: IOrderBody, orderId: string = null): Observable<any>{
    let params = new HttpParams()
    if(orderId){
      params = params.append('orderId',String(orderId));
    }

    return this.api.postLogged('order', orderBody, params);
  }

  generateIzipayForm( orderId: string ): Observable<any>{
    let body: any = {
      orderId: orderId
    }
    return this.api.postLogged('payments/generate-payment-flow', body);
  }

  generateLyraForm(): Observable<any>{
    return this.api.getLogged('payments/lyra/generate-token');
  }

  confirmLyraForm(uuid: string, code: string): Observable<any>{
    return this.api.postLogged('payments/lyra/confirm', { paymentOrderId: uuid, code: code });
  }
}

import { Injectable } from '@angular/core';
import { single } from 'rxjs/operators';
import { IOrderDetail, IOrderDetailSupplier, IOrderDetailSupplierProduct, IOrderItem } from 'src/app/models/order-item.model';
import { DeliveryServiceComponent } from 'src/app/static-pages/delivery-service/delivery-service.component';
import { IOrderBackend, IOrderDetailBackend } from '../user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class OrderStructureService {

  constructor() { }

  orderListStructure( raw: Array<IOrderBackend> ): Array<IOrderItem>{
    let result: Array<IOrderItem> = [];
    let singleOrder: IOrderItem;
    raw.forEach( (order)=>{
      singleOrder = {
        amount_total: order.amount_total,
        code: order.code,
        currency: order.currency.value,
        state: order.status_order.value,
        date: new Date(order.create_date),
        id: order._id,
        product_count: order.product_count
      }
      result.push(singleOrder);
    })
    return result;
  }

  orderDetailStructure( raw: IOrderDetailBackend ): IOrderDetail{
    let result: IOrderDetail;
    result = {
      id: raw._id,
      code: raw.code,
      currency: raw.currency.value,
      date: new Date(raw.create_date),
      delivery: raw.amount_delivery,
      discount: raw.amount_discount,
      subtotal: raw.amount_subtotal,
      total: raw.amount_total,
      method_send: {
        description: raw.method_send_id?.description,
        name: raw.method_send_id?.name
      },
      state: raw.status_order.value,
      stateRef: raw.status_order.ref1,
      type_payment: raw.type_payment,
      user: raw.user_id,
      detail: []
    }
    let singleOrderSupplier: IOrderDetailSupplier;
    let rawSuppliers = new Set(raw && raw.detail.map( (e) => { return e.supplier_delivery })) //e.supplier_delivery._id
    let singleOrderSupplierProduct: IOrderDetailSupplierProduct;
    raw.detail.forEach( (product) => {
      rawSuppliers.forEach( (suppId) => {
        if(product.supplier_delivery === suppId && !(result.detail.find((e)=>{ return e.id === suppId}))){ //product.supplier_delivery._id
          singleOrderSupplier = {
            name: product.product_id.supplier_delivery.name,
            delivery: 0,
            delivery_price: 10,
            delivery_time: null,
            total: 0,
            id: product.supplier_delivery,
            mail: product.product_id.supplier_delivery.email_sales || null,
            phone: product.product_id.supplier_delivery.post_sell_representative || null,
            products: [],
          }
          raw.detail.forEach((item)=>{
            if(suppId === item.supplier_delivery){ //item.supplier_delivery
              singleOrderSupplierProduct = {
                brand: item.product_id.brand.name, //brand.name,
                image_product: raw.url_attachment + item.product_id.image_cover,
                name_product: item.product_name,
                price: item.product_price,
                quantity: item.quantity,
                total_price: item.amount_total,
                delivery_method_price: item.delivery,
                info_product: item.product_id,
                method_send: item.product_id.list_method,
                id_product: item._id
              }
              singleOrderSupplier.products.push(singleOrderSupplierProduct);
              singleOrderSupplier.delivery += item.delivery;
              singleOrderSupplier.total += item.amount_total + item.delivery;
            }
          })
          result.detail.push(singleOrderSupplier);
        }
      })
    })
    return result;
  }
}

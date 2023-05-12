import { Injectable } from '@angular/core';
import { ICartItem } from 'src/app/models/cart-item.model';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';

interface IGroupProductByMethod extends ISupplierOrder {
  methodId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartStructureService {
  constructor() {}

  cartSupplierStructure(raw: Array<ICartItem>): Array<ISupplierOrder> {
    let result: Array<ISupplierOrder> = [];
    let singleSupplierOrder: ISupplierOrder;
    let rawSuppliers = new Set(
      raw &&
        raw.map((e) => {
          return e.info_product.supplier_delivery._id;
        })
    );
    raw &&
      raw.forEach((item) => {
        rawSuppliers.forEach((suppId) => {
          if (
            item.info_product.supplier_delivery._id === suppId &&
            !result.find((e) => {
              return e.id === suppId;
            })
          ) {
            singleSupplierOrder = {
              delivery_price: null,
              delivery_time: null,
              name: item.info_product.supplier_delivery.name,
              id: suppId,
              products: [],
            };
            result.push(singleSupplierOrder);
          }
        });
      });
    result.forEach((supplier) => {
      raw.forEach((item) => {
        if (supplier.id === item.info_product.supplier_delivery._id) {
          supplier.products.push(item);
        }
      });
    });
    return result;
  }

  checkoutSupplierStructure(raw: Array<ICartItem>): Array<ISupplierOrder> {
    let result: Array<ISupplierOrder> = [];
    const sendMethodsIds = new Set(raw && raw.map((e) => e.method_send[0]));
    const groupedByMethod: IGroupProductByMethod[] = [];

    for (const product of raw) {
      for (const methodId of sendMethodsIds) {
        if (
          product.method_send[0] === methodId &&
          !groupedByMethod.find((e) => e.methodId === methodId)
        ) {
          groupedByMethod.push({
            methodId,
            delivery_price: product.info_product.supplier_delivery
              .method_send[0]
              ? product.delivery_method_price
              : -1,
            delivery_time: product.info_product.supplier_delivery.method_send[0]
              ? product.rangeMin + ' - ' + product.rangeMax + ' días'
              : 'x',
            name: product.info_product.supplier_delivery.name,
            id: product.info_product.supplier_delivery._id,
            products: [],
          });
        }
      }
    }

    for (const group of groupedByMethod) {
      const products = raw.filter(
        (product) =>
          product.method_send[0] === group.methodId &&
          product.info_product.supplier_delivery._id === group.id
      );
      group.products = [...products];
    }

    result = groupedByMethod.map((group) => {
      delete group.methodId;
      return group;
    });

    return result;
  }

  deliveryTotal(raw: Array<ISupplierOrder>): number {
    let result: number = 0;
    raw.forEach((supplier) => {
      result += supplier.delivery_price;
    });
    return result;
  }
}

import { IOrderItem, IOrderDetailSupplier, IOrderDetailSupplierProduct } from '../models/order-item.model';
import { product } from '../mockups/product.mockup'

export const orderDetailSupplierItem: IOrderDetailSupplierProduct = {
  _id: '1111111',
  id_product: '22222',
  image_product: 'https://via.placeholder.com/100x100',
  name_product: 'Producto',
  price: 10,
  quantity: 2,
  total_price: 20,
  brand: "Something",
  info_product: {
    stock: 1,
    name: 'Tempor consequat culpa elit qui consectetur.',
    brand: 'Marca',
    image_cover: 'http://placekitten.com/400/400',
    price: 1600,
    special_price: 1000,
    friendly_url: 'http://google.com',
  },
};

export const orderDetailSupplier: IOrderDetailSupplier = {
  name: 'Nombre Proveedor',
  delivery_price: null,
  delivery_time: null,
  delivery: 200,
  total: 400,
  id: "0001",
  products: [orderDetailSupplierItem, orderDetailSupplierItem]
};

export const orderItem: IOrderItem = {
  code: "#########",
  amount_total: 90,
  date: new Date(),
  state: 'Entregado',
  currency: 'PEN',
  id: '001',
  product_count: 2
};

export const orders: Array<IOrderItem> = [orderItem, orderItem, orderItem];

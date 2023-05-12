import { ICartItem } from '../models/cart-item.model';
import { ICart } from '../models/cart.model'
import { ISupplierOrder } from '../models/supplier-order.model';

export const cartItem: ICartItem = {
  _id: '1111111',
  id_product: '22222',
  image_product: 'https://via.placeholder.com/100x100',
  name_product: 'Producto',
  price: 10,
  quantity: 2,
  total_price: 20,
  info_product: {
    stock: 1,
    name: 'Tempor consequat culpa elit qui consectetur.',
    brand: 'Marca',
    image_cover: 'http://placekitten.com/400/400',
    price: 1600,
    special_price: 1000,
    friendly_url: 'http://google.com',
  },
}

export const supplierOrder: ISupplierOrder = {
  name: 'Nombre Proveedor',
  delivery_price: null,
  delivery_time: null,
  products: [cartItem, cartItem]
}

export const cartFull: ICart = {
  infoProducts: [cartItem, cartItem, cartItem],
  subtotal: 8000
}

export const cart: ISupplierOrder[] = [supplierOrder, supplierOrder, supplierOrder]
export const cartBE: ICart = cartFull

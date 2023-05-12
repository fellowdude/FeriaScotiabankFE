import { ICartItem } from "./cart-item.model";

export interface ICart{
  infoProducts: Array<ICartItem>;
  subtotal: number
}

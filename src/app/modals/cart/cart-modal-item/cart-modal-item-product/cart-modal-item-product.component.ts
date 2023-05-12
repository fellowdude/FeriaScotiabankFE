import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartItem } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-cart-modal-item-product',
  templateUrl: './cart-modal-item-product.component.html',
  styleUrls: ['./cart-modal-item-product.component.scss']
})
export class CartModalItemProductComponent implements OnInit {
  @Input() product: ICartItem;
  @Input() isSummary: boolean;
  @Output() onClick = new EventEmitter<any>();
  productStockList: Array<Number> = [];
  constructor() { }

  ngOnInit(): void {
    for(let i = -10; i < 40; i++){
      if(Number(this.product.quantity) + i > 0 && Number(this.product.quantity) + i <= Number(this.product.quantity) + this.product.info_product.stock){
        this.productStockList.push(Number(this.product.quantity) + i)
      }
    }
  }

  deleteItem(): void{
    this.onClick.emit({ type: 'delete', id: this.product._id, idProduct: this.product.id_product, quantity: this.product.quantity  })
  }

  changeQunatity():void{
    this.onClick.emit({ type: 'quantity', quantity: this.product.quantity, id: this.product._id, idProduct: this.product.id_product });
  }

}

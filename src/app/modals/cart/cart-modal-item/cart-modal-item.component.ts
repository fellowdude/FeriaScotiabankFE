import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartItem } from 'src/app/models/cart-item.model';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';

@Component({
  selector: 'app-cart-modal-item',
  templateUrl: './cart-modal-item.component.html',
  styleUrls: ['./cart-modal-item.component.scss']
})
export class CartModalItemComponent implements OnInit {
  @Input() supplierOrder: ISupplierOrder;
  @Input() isSummary: boolean = false;
  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  itemChange(event: any, product: ICartItem): void{
    this.onClick.emit({... event, product: product});
  }

}

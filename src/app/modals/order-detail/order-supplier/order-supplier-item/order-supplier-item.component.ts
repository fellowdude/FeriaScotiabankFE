import { Component, Input, OnInit } from '@angular/core';
import { IOrderDetailSupplierProduct } from 'src/app/models/order-item.model';

@Component({
  selector: 'app-order-supplier-item',
  templateUrl: './order-supplier-item.component.html',
  styleUrls: ['./order-supplier-item.component.scss']
})
export class OrderSupplierItemComponent implements OnInit {
  @Input() orderSupplierItem: IOrderDetailSupplierProduct;
  constructor() { }

  ngOnInit(): void {}

}

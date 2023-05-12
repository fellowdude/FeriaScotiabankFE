import { Component, Input, OnInit } from '@angular/core';
import { IOrderDetailSupplier } from 'src/app/models/order-item.model';

@Component({
  selector: 'app-order-supplier',
  templateUrl: './order-supplier.component.html',
  styleUrls: ['./order-supplier.component.scss']
})
export class OrderSupplierComponent implements OnInit {
  @Input() orderSupplier: IOrderDetailSupplier;
  constructor() { }

  ngOnInit(): void {
  }

}

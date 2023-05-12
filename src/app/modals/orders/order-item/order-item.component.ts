import { Component, Inject, Input, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

import { IOrderItem } from 'src/app/models/order-item.model'
import { ORDER_DETAIL_TOKEN } from '../../order-detail/order-detail';
@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order: IOrderItem;
  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService,
    @Inject(ORDER_DETAIL_TOKEN) private orderDetailComponent: any) { }

  ngOnInit(): void {
  }

  orderDetail(): void {
    this.modalRef && this.modalRef.hide();
    this.modalRef = this.modalService.show(this.orderDetailComponent,{
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-full-height modal-right mh-100 my-0",
      containerClass: "right modal-dialog-scrollable mh-100 my-0",
      animated: true,
      data: {
        orderItem: this.order
      }
    });
  }

}

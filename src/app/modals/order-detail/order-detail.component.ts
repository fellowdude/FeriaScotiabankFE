import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Constants } from 'src/app/constants';
import { IOrderDetail, IOrderItem } from 'src/app/models/order-item.model';
import { OrderStructureService } from 'src/app/services/internal/order-structure.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderItem: IOrderItem;
  order: IOrderDetail;
  loading: boolean = false;
  pointsDivider = Constants.POINTS_DIVIDER;

  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService, private userProfileService: UserProfileService, private orderStructureService: OrderStructureService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userProfileService.userOrderDetail(this.orderItem.id).subscribe(
      ( result )=>{
        this.order = this.orderStructureService.orderDetailStructure( result );
        this.loading = false;
      }
    )
  }

  buyBack(): void{
    this.closeModal();
  }

  userOrders(): void{
    this.closeModal();
    this.modalRef = this.modalService.show(OrdersComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-full-height modal-right mh-100 my-0",
      containerClass: "right modal-dialog-scrollable mh-100 my-0",
      animated: true,
    })
  }

  closeModal(): void{
    this.modalRef && this.modalRef.hide();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { IOrderItem } from 'src/app/models/order-item.model';
import { AddressesComponent } from 'src/app/modals/addresses/addresses.component';
import { ProfileComponent } from 'src/app/modals/profile/profile.component';
import { orders } from 'src/app/mockups/order.mockup';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { OrderStructureService } from 'src/app/services/internal/order-structure.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @Input() orders: Array<IOrderItem> = null;
  loading: boolean = false;

  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService, private userProfileService: UserProfileService, private orderStructureService: OrderStructureService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userProfileService.userOrders().subscribe(
      (result) => {
        this.loading = false;
        this.orders = this.orderStructureService.orderListStructure( result );
      }
    )
  }

  returnProfile(): void{
    this.closeModal();
    this.modalRef = this.modalService.show(ProfileComponent, {
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

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }
}

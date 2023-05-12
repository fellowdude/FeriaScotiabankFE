import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { HeaderService } from 'src/app/services/internal/header.service';
import { UserAccessService } from 'src/app/services/user-access.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

import { ADDRESSES_TOKEN } from '../addresses/addresses';
import { MY_DATA_TOKEN } from '../my-data/my-data';
import { ORDERS_TOKEN } from '../orders/orders';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService,
    @Inject(MY_DATA_TOKEN) private myDataComponent: any,
    @Inject(ADDRESSES_TOKEN) private addressesComponent: any,
    @Inject(ORDERS_TOKEN) private ordersComponent: any,
    @Inject(PLATFORM_ID) private platformId: any,
    private userAccessService: UserAccessService,
    private headerInternalService: HeaderService,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
  }

  userData(): void{
    this.closeModal();
    this.modalRef = this.modalService.show(this.myDataComponent, {
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

  userAddresses(): void{
    this.closeModal();
    this.modalRef = this.modalService.show(this.addressesComponent, {
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

  userOrders(): void{
    this.closeModal();
    this.modalRef = this.modalService.show(this.ordersComponent, {
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

  userLogOut(): void{
    if(isPlatformBrowser(this.platformId) && localStorage.getItem('jwt')){      
      this.userAccessService.logOut().subscribe( (result) => {
        localStorage.removeItem('jwt');
        this.headerInternalService.emitData({ type: "SESSION_CLOSED" });
        this.closeModal();
        this.toastrService.success(Messages.successLogOut, Messages.logOutTitle);
      })
    }
  }

  closeModal(): void{
    this.modalRef && this.modalRef.hide();
  }
}

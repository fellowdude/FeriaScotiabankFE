import { LocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { HeaderService } from 'src/app/services/internal/header.service';
import { CART_TOKEN } from '../cart/cart';
import { CartComponent } from '../cart/cart.component';
import { CheckoutSummaryComponent } from '../checkout-summary/checkout-summary.component';

@Component({
  selector: 'app-checkout-error',
  templateUrl: './checkout-error.component.html',
  styleUrls: ['./checkout-error.component.scss']
})
export class CheckoutErrorComponent implements OnInit {

  constructor(public modalRef: MDBModalRef, private modalService: MDBModalService, private locationStrategy: LocationStrategy,
    private headerInternalService: HeaderService, @Inject(CART_TOKEN) private cartComponent: any,) { }

  ngOnInit(): void {
  }

  finishCheckout(): void {
    this.headerInternalService.emitData({type: "UPDATE_CART"});
    this.closeModal();
    this.modalRef = this.modalService.show(this.cartComponent,{
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: "modal-full-height modal-right mh-100 my-0",
      containerClass: "right modal-dialog-scrollable mh-100 my-0",
      animated: true
    })
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
      this.closeModal();
    })
  }

}

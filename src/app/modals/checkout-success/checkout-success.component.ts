import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { HeaderService } from 'src/app/services/internal/header.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  orderNumber: string;
  constructor(public modalRef: MDBModalRef, private locationStrategy: LocationStrategy, private headerInternalService: HeaderService) { }

  ngOnInit(): void {
  }

  finishCheckout(): void {
    this.headerInternalService.emitData({type: "UPDATE_CART"});
    this.closeModal();
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

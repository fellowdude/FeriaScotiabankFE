import { Component, Inject, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { IAddressItemCheckout } from 'src/app/models/address.model';
import { CHECKOUT_SUMMARY_TOKEN } from '../checkout-summary/checkout-summary';
import { CART_TOKEN } from '../cart/cart';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ADDRESS_FORM_TOKEN } from '../address-form/address-form';
import { IOrderBody } from 'src/app/models/order-body.model';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { Constants } from 'src/app/constants';
import { LocationStrategy } from '@angular/common';
import { ICartItem } from 'src/app/models/cart-item.model';
import { GtagService } from 'src/app/gtag/gtag.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent implements OnInit {
  addresses: Array<IAddressItemCheckout> = [];
  selectedAddress: IAddressItemCheckout;
  subtotal: number = 0;
  regularSubtotal: number = 0;
  paymentInfo: IOrderBody;
  cartItems: ICartItem[] = [];
  loadingList: boolean = false;
  loadingNext: boolean = false;
  pointsDivider: number = Constants.POINTS_DIVIDER;
  showToggle: boolean = true;

  constructor(
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private locationStrategy: LocationStrategy,
    @Inject(ADDRESS_FORM_TOKEN) private addressFormComponent: any,
    @Inject(CHECKOUT_SUMMARY_TOKEN) private checkoutSummaryComponent: any,
    @Inject(CART_TOKEN) private cartComponent: any,
    private checkoutService: CheckoutService,
    private toastrService: ToastrService,
    private gtag: GtagService
  ) {
    this.preventBackButton();
  }

  ngOnInit(): void {
    console.log(this.cartItems);
    var isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera()
        );
      },
    };

    if (isMobile.any()) this.showToggle = false;

    this.loadingList = true;
    this.checkoutService
      .getDeliveryPrices()
      .subscribe((response: Array<IAddressItemCheckout>) => {
        this.loadingList = false;
        this.addresses = response;
        this.selectedAddress = null;
        this.addresses.forEach((e) => {
          e.checked = false;
        });
      });
  }

  addNewAddress(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.addressFormComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        checkout: true,
        subtotal: this.subtotal,
        regularSubtotal: this.regularSubtotal,
        paymentInfo: this.paymentInfo,
      },
    });
  }

  checkoutSummary(): void {
    if (this.selectedAddress) {
      this.loadingNext = true;
      this.paymentInfo.current_step = 0;
      this.paymentInfo.address_id = this.selectedAddress._id;
      this.paymentInfo.delivery_address = this.selectedAddress.address;
      this.paymentInfo.delivery_type_address = this.selectedAddress.type_address;
      this.paymentInfo.delivery_department_id = this.selectedAddress.department._id;
      this.paymentInfo.delivery_district_id = this.selectedAddress.district._id;
      this.paymentInfo.delivery_province_id = this.selectedAddress.province._id;
      this.paymentInfo.delivery_reference = this.selectedAddress.reference;
      this.paymentInfo.delivery_phone_customer = this.selectedAddress.cellphone;
      this.checkoutService
        .createOrder(this.paymentInfo)
        .subscribe((result: any) => {
          const gtagList = this.cartItems.map((product, idx) => ({
            brand: product?.info_product?.brand.name,
            category: product?.info_product?.categories[0].name,
            id: product?.info_product?.SKU,
            list_name: 'Checkout',
            list_position: idx + 1,
            name: product?.name_product,
            price: product?.info_product?.special_price,
            quantity: product?.quantity,
          }));
			console.log(result?.amount_total)
          // gtag BeginCheckout
          this.gtag.beginCheckout({
            affiliation: 'Feria Scotiabank Web',
            checkout_step: 1,
            currency: 'PEN',
            items: gtagList,
            shipping: result?.amount_delivery,
            tax: 0,
            transaction_id: result?.code,
            value: result?.amount_total,
          });

          // GTAG checkoutProgress
          this.gtag.checkoutProgress({
            affiliation: 'Feria Scotiabank Web',
            checkout_step: 2,
            currency: 'PEN',
            items: gtagList,
            shipping: result?.amount_delivery,
            tax: 0,
            transaction_id: result?.code,
            value: result?.amount_total,
          });

          this.loadingNext = false;
          this.closeModal();
          this.modalRef = this.modalService.show(
            this.checkoutSummaryComponent,
            {
              backdrop: true,
              keyboard: true,
              focus: true,
              show: false,
              ignoreBackdropClick: false,
              class: 'modal-full-height modal-right mh-100 my-0',
              containerClass: 'right modal-dialog-scrollable mh-100 my-0',
              animated: true,
              data: {
                selectedAddress: this.selectedAddress,
                paymentInfo: this.paymentInfo,
                orderId: result._id,
				orderCode: result?.code
              },
            }
          );
        });
    } else {
      this.toastrService.warning(
        Messages.errorOrderNoSelectedAddress,
        Messages.warningTitle
      );
    }
  }

  changeChecked(event): void {
    this.addresses.forEach((e) => {
      e.checked = false;
    });
    this.addresses[event].checked = true;
    this.selectedAddress = this.addresses[event];
  }

  returnCart(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.cartComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
      this.returnCart();
    });
  }

  toggleInfo(): void {
    this.showToggle = !this.showToggle;
  }
}

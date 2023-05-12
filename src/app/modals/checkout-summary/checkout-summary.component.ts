import { Component, Inject, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ICart } from 'src/app/models/cart.model';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';
import { CHECKOUT_RECEIPT_TOKEN } from '../checkout-receipt/checkout-receipt';
import { CHECKOUT_ADDRESS_TOKEN } from '../checkout-address/checkout-address';
import { CartStructureService } from 'src/app/services/internal/cart-structure.service';
import { CartService, ICartBE } from 'src/app/services/cart.service';
import { IAddressItem } from 'src/app/models/address.model';
import { IOrderBody } from 'src/app/models/order-body.model';
import { ICartItem } from 'src/app/models/cart-item.model';
import { Constants } from 'src/app/constants';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { HeaderService } from 'src/app/services/internal/header.service';
import { LocationStrategy } from '@angular/common';
import { GtagService } from 'src/app/gtag/gtag.service';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.scss'],
})
export class CheckoutSummaryComponent implements OnInit {
  summary: Array<ISupplierOrder> = [];
  summaryBE: ICart = { infoProducts: [], subtotal: 0 };
  deliveryTotal: number = 0;
  selectedAddress: IAddressItem;
  paymentInfo: IOrderBody;
  orderId: string;
  orderCode: string;
  regularSubtotal: number = 0;
  loading: boolean = false;
  noDeliveryInCart: boolean = false;
  pointsDivider: number = Constants.POINTS_DIVIDER;
  showToggle: boolean = true;

  constructor(
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private locationStrategy: LocationStrategy,
    @Inject(CHECKOUT_RECEIPT_TOKEN) private checkoutReceiptComponent: any,
    @Inject(CHECKOUT_ADDRESS_TOKEN) private checkoutAddressComponent: any,
    private cartService: CartService,
    private cartStructureService: CartStructureService,
    private toastrService: ToastrService,
    private headerInternalService: HeaderService,
    private gtag: GtagService
  ) {
    this.preventBackButton();
  }

  ngOnInit(): void {
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

    this.initializeSummary();
  }

  initializeSummary() {
    let verifyItem = {
      address: this.selectedAddress.district._id,
      ubigeo: this.selectedAddress.ubigeo,
      type_address_ERP: this.selectedAddress.type_address_ERP || null,
    };
    this.loading = true;
    this.cartService.cartList(0, verifyItem).subscribe((result: ICartBE) => {
      this.loading = false;
      this.summaryBE.subtotal = result.subtotal;
      this.summaryBE.infoProducts = result.infoShoppingCart;
      if (result.infoShoppingCart.length > 0) {
        this.summary = this.cartStructureService.checkoutSupplierStructure(
          this.summaryBE.infoProducts
        );
        this.regularSubtotal = this.calculateRegularSubtotal(
          result.infoShoppingCart
        );
        this.deliveryTotal = this.cartStructureService.deliveryTotal(
          this.summary
        );
        this.headerInternalService.emitData({ type: 'UPDATE_CART' });
        this.checkDelivery();
      } else {
        this.closeModal();
        this.toastrService.warning(
          Messages.errorNoItemsInCart,
          Messages.warningTitle
        );
        this.headerInternalService.emitData({ type: 'UPDATE_CART' });
      }
    });
  }

  cartChange(event) {
    if (event.type == 'delete') {
      this.loading = true;
      this.cartService
        .deleteCartItem(event.idProduct, event.quantity)
        .subscribe(() => {
          this.headerInternalService.emitData({ type: 'UPDATE_CART' });
          this.toastrService.success(
            Messages.successDeleteCart,
            Messages.successTitle
          );
          this.initializeSummary();
        });
    }
  }

  checkoutReciept(): void {
    this.paymentInfo.detail = [];
    this.summaryBE.infoProducts.forEach((item) => {
      this.paymentInfo.detail.push({
        discount: 0,
        discount_price: 0,
        method_send: item.method_send.length > 0 ? item.method_send[0] : null,
        price: item.price,
        quantity: item.quantity,
        product_id: item.id_product,
        reason: '',
        warranty: item.warranty,
        installation: item.installation,
      });
    });

    const gtagList = this.summaryBE.infoProducts.map((product, idx) => ({
      brand: product?.info_product?.brand.name,
      category: product?.info_product?.categories[0].name,
      id: product?.info_product?.SKU,
      list_name: 'Checkout',
      list_position: idx + 1,
      name: product?.name_product,
      price: product?.info_product?.special_price,
      quantity: product?.quantity,
    }));

    // GTAG checkoutProgress
    this.gtag.checkoutProgress({
      affiliation: 'Feria Scotiabank Web',
      checkout_step: 3,
      currency: 'PEN',
      items: gtagList,
      shipping: this.deliveryTotal,
      tax: 0,
      transaction_id: this.orderCode,
      value: this.summaryBE.subtotal + this.deliveryTotal,
    });

    this.closeModal();
    this.modalRef = this.modalService.show(this.checkoutReceiptComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        total: this.summaryBE.subtotal + this.deliveryTotal,
        paymentInfo: this.paymentInfo,
        orderId: this.orderId,
        selectedAddress: this.selectedAddress,
        regularTotal: this.regularSubtotal + this.deliveryTotal,
        orderCode: this.orderCode,
        cartItems: this.summaryBE.infoProducts,
      },
    });
  }

  returnAddress(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.checkoutAddressComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        subtotal: this.summaryBE.subtotal,
        paymentInfo: this.paymentInfo,
        regularSubtotal: this.regularSubtotal,
      },
    });
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }

  calculateRegularSubtotal(cart: ICartItem[]): number {
    let result = 0;
    cart.forEach((item) => {
      result += item.info_product.price * item.quantity;
    });
    return result;
  }

  checkDelivery(): void {
    this.noDeliveryInCart = false;
    this.summary.forEach((e) => {
      if (e.delivery_price === -1 || e.delivery_time === 'x') {
        this.toastrService.warning(
          Messages.summaryCartProblems,
          Messages.warningTitle
        );
        this.noDeliveryInCart = true;
        return;
      }
    });
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
      this.returnAddress();
    });
  }

  toggleInfo(): void {
    this.showToggle = !this.showToggle;
  }
}

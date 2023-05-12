import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';
import { ICart } from 'src/app/models/cart.model';
import { IOrderBody } from 'src/app/models/order-body.model';
import { IUserProfileData } from 'src/app/models/user-profile.model';
import { CHECKOUT_ADDRESS_TOKEN } from '../checkout-address/checkout-address';
import { CartService, ICartBE } from 'src/app/services/cart.service';
import { CartStructureService } from 'src/app/services/internal/cart-structure.service';
import { HeaderService } from 'src/app/services/internal/header.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { ICartItem } from 'src/app/models/cart-item.model';
import { Constants } from 'src/app/constants';
import { LocationStrategy } from '@angular/common';
import { CheckoutBottomInfoComponent } from '../checkout-bottom-info/checkout-bottom-info.component';
import { GtagService } from 'src/app/gtag/gtag.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Array<ISupplierOrder> = [];
  cartBE: ICart = { infoProducts: [], subtotal: 0 };
  regularSubtotal: number = 0;
  userInfo: IUserProfileData;
  loading: boolean = false;
  pointsDivider: number = Constants.POINTS_DIVIDER;
  showToggle: boolean = true;

  constructor(
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    @Inject(CHECKOUT_ADDRESS_TOKEN) private checkoutAddressComponent: any,
    private locationStrategy: LocationStrategy,
    private cartService: CartService,
    private cartStructureService: CartStructureService,
    private headerInternalService: HeaderService,
    private userProfileService: UserProfileService,
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

    //if(isMobile.any()) this.showToggle = false;

    this.userProfileService.userData().subscribe((result: IUserProfileData) => {
      this.userInfo = result;
    });
    this.initializeCartList();
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
      this.closeModal();
    });
  }

  initializeCartList(): void {
    this.loading = true;
    this.cartService.cartList().subscribe((result: ICartBE) => {
      this.loading = false;
      this.cartBE.subtotal = result.subtotal;
      this.cartBE.infoProducts = result.infoShoppingCart;
      console.log(this.cartBE.infoProducts);
      this.regularSubtotal = this.calculateRegularSubtotal(
        this.cartBE.infoProducts
      );
      this.cart = this.cartStructureService.cartSupplierStructure(
        this.cartBE.infoProducts
      );
      this.headerInternalService.emitData({ type: 'UPDATE_CART' });
    });
  }

  checkout(): void {
    let paymentInfo: IOrderBody = {
      shopping_cart_id: this.cartBE.infoProducts[0]._id,
      currency: this.cartBE.infoProducts[0].info_product.currency,
      type_payment: 'Pendiente de Pago',
      user_phone: this.userInfo.phone,
      address_id: null,
      delivery_name_customer:
        this.userInfo.name +
        ' ' +
        this.userInfo.last_name_father +
        ' ' +
        this.userInfo.last_name_mother,
      delivery_phone_customer: null,
      delivery_type_address: null,
      delivery_address: null,
      delivery_reference: null,
      delivery_district_id: null,
      delivery_province_id: null,
      delivery_department_id: null,
      invoice_send: false,
      invoice_ruc: null,
      invoice_business_name: null,
      invoice_address: null,
      invoice_district: null,
      invoice_province: null,
      invoice_department: null,
      method_send_id: null,
      user_id: this.userInfo._id,
      current_step: 0,
      detail: [],
    };
    this.cartBE.infoProducts.forEach((item) => {
      paymentInfo.detail.push({
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
        regularSubtotal: this.regularSubtotal,
        subtotal: this.cartBE.subtotal,
        paymentInfo: paymentInfo,
        cartItems: this.cartBE.infoProducts,
      },
    });
  }

  cartChange(event: any) {
    if (event.type == 'quantity') {
      this.loading = true;
      event.product.quantity = event.quantity;
      this.cartService.updateCartItem(event.product).subscribe(() => {
        //GTAG addToCart
        this.gtag.addToCart({
          currency: 'PEN',
          items: [
            {
              id: event.product.info_product?.SKU,
              name: event.product?.info_product?.name,
              brand: event.product?.info_product?.brand?.name,
              quantity: Number(event.quantity),
              price: event.product?.info_product?.special_price,
              list_name: 'Checkout',
              list_position: 1,
            },
          ],
        });
        this.initializeCartList();
      });
    }
    if (event.type == 'delete') {
      this.loading = true;
      this.cartService
        .deleteCartItem(event.idProduct, event.quantity)
        .subscribe(() => {
          this.gtag.removeFromCart({
            currency: 'PEN',
            items: [
              {
                id: event.product.info_product?.SKU,
                name: event.product?.info_product?.name,
                brand: event.product?.info_product?.brand?.name,
                quantity: Number(event.quantity),
                price: event.product?.info_product?.special_price,
                list_name: 'Checkout',
                list_position: 1,
              },
            ],
          });
          this.initializeCartList();
        });
    }
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }

  calculateRegularSubtotal(cart: ICartItem[]): number {
    let result = 0;
    cart.forEach((item) => {
      result += item.price * item.quantity;
    });
    return result;
  }

  toggleInfo(): void {
    this.showToggle = !this.showToggle;
  }
}

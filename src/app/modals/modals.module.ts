import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonsModule,
  CheckboxModule,
  IconsModule,
  InputsModule,
  InputUtilitiesModule,
  ModalModule,
} from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MicroModule } from '../micro/micro.module';

import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { OrderItemComponent } from './orders/order-item/order-item.component';
import { AddressItemComponent } from './addresses/address-item/address-item.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistItemComponent } from './wishlist/wishlist-item/wishlist-item.component';
import { CartComponent } from './cart/cart.component';
import { CartModalItemComponent } from './cart/cart-modal-item/cart-modal-item.component';
import { MyDataComponent } from './my-data/my-data.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutReceiptComponent } from './checkout-receipt/checkout-receipt.component';
import { CheckoutIzipayComponent } from './checkout-izipay/checkout-izipay.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutErrorComponent } from './checkout-error/checkout-error.component';
import { CheckoutSummaryComponent } from './checkout-summary/checkout-summary.component';
import { CheckoutAddressItemComponent } from './checkout-address/checkout-address-item/checkout-address-item.component';
import { CartModalItemProductComponent } from './cart/cart-modal-item/cart-modal-item-product/cart-modal-item-product.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

import { LOGIN_TOKEN } from './login/login';
import { REGISTER_TOKEN } from './register/register';
import { RECOVER_PASSWORD_TOKEN } from './recover-password/recover-password';
import { NEW_PASSWORD_TOKEN } from './new-password/new-password';

import { PROFILE_TOKEN } from './profile/profile';
import { MY_DATA_TOKEN } from './my-data/my-data';
import { ADDRESSES_TOKEN } from './addresses/addresses';
import { ADDRESS_FORM_TOKEN } from './address-form/address-form';
import { ORDERS_TOKEN } from './orders/orders';
import { ORDER_DETAIL_TOKEN } from './order-detail/order-detail';

import { CART_TOKEN } from './cart/cart';
import { CHECKOUT_ADDRESS_TOKEN } from './checkout-address/checkout-address';
import { CHECKOUT_SUMMARY_TOKEN } from './checkout-summary/checkout-summary';
import { CHECKOUT_RECEIPT_TOKEN } from './checkout-receipt/checkout-receipt';
import { CHECKOUT_IZIPAY_TOKEN } from './checkout-izipay/checkout-izipay';
import { CHECKOUT_SUCCESS_TOKEN } from './checkout-success/checkout-success';
import { CHECKOUT_ERROR_TOKEN } from './checkout-error/checkout-error';

import { CONFIRMATION_TOKEN } from './confirmation/confirmation';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalLoadingComponent } from './modal-loading/modal-loading.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { OrderSupplierComponent } from './order-detail/order-supplier/order-supplier.component';
import { OrderSupplierItemComponent } from './order-detail/order-supplier/order-supplier-item/order-supplier-item.component';
import { DirectivesModule } from '../directives/directives.module';
import { RouterModule } from '@angular/router';
import { CheckoutBottomInfoComponent } from './checkout-bottom-info/checkout-bottom-info.component';

@NgModule({
  declarations: [
    ProfileComponent,
    AddressesComponent,
    OrdersComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    OrderItemComponent,
    AddressItemComponent,
    AddressFormComponent,
    OrderDetailComponent,
    WishlistComponent,
    WishlistItemComponent,
    CartComponent,
    CartModalItemComponent,
    MyDataComponent,
    CheckoutAddressComponent,
    CheckoutReceiptComponent,
    CheckoutIzipayComponent,
    CheckoutSuccessComponent,
    CheckoutErrorComponent,
    CheckoutSummaryComponent,
    CheckoutAddressItemComponent,
    CartModalItemProductComponent,
    NewPasswordComponent,
    ConfirmationComponent,
    ModalHeaderComponent,
    ModalLoadingComponent,
    OrderSupplierComponent,
    OrderSupplierItemComponent,
    CheckoutBottomInfoComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    IconsModule,
    InputUtilitiesModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    MicroModule,
    ButtonsModule,
    LazyLoadImageModule,
    DirectivesModule,
    RouterModule
  ],
  exports: [
    ProfileComponent,
    AddressesComponent,
    OrdersComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    AddressFormComponent,
    OrderDetailComponent,
    WishlistComponent,
    CartComponent,
    MyDataComponent,
    CheckoutBottomInfoComponent
  ],
  entryComponents: [
    ProfileComponent,
    AddressesComponent,
    OrdersComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    AddressFormComponent,
    OrderDetailComponent,
    MyDataComponent,
    CheckoutAddressComponent,
    CheckoutReceiptComponent,
    CheckoutIzipayComponent,
    CheckoutSuccessComponent,
    CheckoutErrorComponent,
    CheckoutSummaryComponent,
    NewPasswordComponent,
    ConfirmationComponent,
    CheckoutBottomInfoComponent
  ],
  providers: [
    { provide: LOGIN_TOKEN, useValue: LoginComponent },
    { provide: REGISTER_TOKEN, useValue: RegisterComponent },
    { provide: RECOVER_PASSWORD_TOKEN, useValue: RecoverPasswordComponent },
    { provide: NEW_PASSWORD_TOKEN, useValue: NewPasswordComponent },
    { provide: PROFILE_TOKEN, useValue: ProfileComponent },
    { provide: MY_DATA_TOKEN, useValue: MyDataComponent },
    { provide: ADDRESSES_TOKEN, useValue: AddressesComponent },
    { provide: ADDRESS_FORM_TOKEN, useValue: AddressFormComponent },
    { provide: ORDERS_TOKEN, useValue: OrdersComponent },
    { provide: ORDER_DETAIL_TOKEN, useValue: OrderDetailComponent },
    { provide: CART_TOKEN, useValue: CartComponent },
    { provide: CHECKOUT_ADDRESS_TOKEN, useValue: CheckoutAddressComponent },
    { provide: CHECKOUT_SUMMARY_TOKEN, useValue: CheckoutSummaryComponent },
    { provide: CHECKOUT_RECEIPT_TOKEN, useValue: CheckoutReceiptComponent },
    { provide: CHECKOUT_IZIPAY_TOKEN, useValue: CheckoutIzipayComponent },
    { provide: CHECKOUT_SUCCESS_TOKEN, useValue: CheckoutSuccessComponent },
    { provide: CHECKOUT_ERROR_TOKEN, useValue: CheckoutErrorComponent },
    { provide: CONFIRMATION_TOKEN, useValue: ConfirmationComponent },
  ],
})
export class ModalsModule {}

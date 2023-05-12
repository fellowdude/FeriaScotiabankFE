import { number, object } from '@storybook/addon-knobs';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { MDBModalRef, ModalModule } from 'angular-bootstrap-md';

import { ModalsModule } from '../app/modals/modals.module';
import { CartComponent } from '../app/modals/cart/cart.component';
import { CheckoutAddressComponent } from '../app/modals/checkout-address/checkout-address.component';
import { CheckoutSummaryComponent } from '../app/modals/checkout-summary/checkout-summary.component';
import { CheckoutReceiptComponent } from '../app/modals/checkout-receipt/checkout-receipt.component';
import { CheckoutIzipayComponent } from '../app/modals/checkout-izipay/checkout-izipay.component';
import { CheckoutSuccessComponent } from '../app/modals/checkout-success/checkout-success.component';
import { CheckoutErrorComponent } from '../app/modals/checkout-error/checkout-error.component';

import { cart, cartBE } from '../app/mockups/cart.mockup';
import { addresses } from '../app/mockups/address.mockup';
import { summary, summaryBE } from '../app/mockups/summary.mockup';

import { CART_TOKEN } from '../app/modals/cart/cart';
import { CHECKOUT_ADDRESS_TOKEN } from '../app/modals/checkout-address/checkout-address';
import { CHECKOUT_SUMMARY_TOKEN } from '../app/modals/checkout-summary/checkout-summary';
import { CHECKOUT_RECEIPT_TOKEN } from '../app/modals/checkout-receipt/checkout-receipt';
import { CHECKOUT_IZIPAY_TOKEN } from '../app/modals/checkout-izipay/checkout-izipay';
import { CHECKOUT_ERROR_TOKEN } from '../app/modals/checkout-error/checkout-error';
import { HttpClientModule } from '@angular/common/http';

const card = storiesOf('Modals/Checkout', module).addDecorator(
  moduleMetadata({
    imports: [ModalsModule, ModalModule.forRoot(), HttpClientModule],
    providers: [
      MDBModalRef,
      { provide: CART_TOKEN, useValue: CartComponent },
      { provide: CHECKOUT_ADDRESS_TOKEN, useValue: CheckoutAddressComponent },
      { provide: CHECKOUT_SUMMARY_TOKEN, useValue: CheckoutSummaryComponent },
      { provide: CHECKOUT_RECEIPT_TOKEN, useValue: CheckoutReceiptComponent },
      { provide: CHECKOUT_IZIPAY_TOKEN, useValue: CheckoutIzipayComponent },
      { provide: CHECKOUT_ADDRESS_TOKEN, useValue: CheckoutSuccessComponent },
      { provide: CHECKOUT_ERROR_TOKEN, useValue: CheckoutErrorComponent },
    ]
  })
);

card.add('Cart', () => {
  return {
    component: CartComponent,
    props: {
      cart: object('cart', cart),
      cartBE: object('cartBE', cartBE),
    },
  };
});

card.add('Address', () => {
  return {
    component: CheckoutAddressComponent,
    props: {
      addresses: object('addresses', addresses),
      subtotal: number('subtotal', cartBE.subtotal)
    },
  };
});

card.add('Summary', () => {
  return {
    component: CheckoutSummaryComponent,
    props: {
      summary: object('summary', summary),
      summaryBE: object('summaryBE', summaryBE),
    },
  };
});

card.add('Reciept', () => {
  return {
    component: CheckoutReceiptComponent,
    props: {
      total: number('subtotal', summaryBE.subtotal)
    },
  };
});

card.add('Izipay', () => {
  return {
    component: CheckoutIzipayComponent,
    props: {},
  };
});

card.add('Success', () => {
  return {
    component: CheckoutSuccessComponent,
    props: {
      orderNumber: '00001'
    },
  };
});

card.add('Error', () => {
  return {
    component: CheckoutErrorComponent,
    props: {},
  };
});


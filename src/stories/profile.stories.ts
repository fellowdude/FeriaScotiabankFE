import { object } from '@storybook/addon-knobs';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { MDBModalRef, ModalModule } from 'angular-bootstrap-md';
import { addresses, addressItem } from '../app/mockups/address.mockup';
import { orders, orderItem } from '../app/mockups/order.mockup';
import { ADDRESS_FORM_TOKEN } from '../app/modals/address-form/address-form';
import { AddressFormComponent } from '../app/modals/address-form/address-form.component';
import { ADDRESSES_TOKEN } from '../app/modals/addresses/addresses';
import { AddressesComponent } from '../app/modals/addresses/addresses.component';

import { ModalsModule } from '../app/modals/modals.module';
import { MY_DATA_TOKEN } from '../app/modals/my-data/my-data';
import { MyDataComponent } from '../app/modals/my-data/my-data.component';
import { ORDER_DETAIL_TOKEN } from '../app/modals/order-detail/order-detail';
import { OrderDetailComponent } from '../app/modals/order-detail/order-detail.component';
import { ORDERS_TOKEN } from '../app/modals/orders/orders';
import { OrdersComponent } from '../app/modals/orders/orders.component';
import { PROFILE_TOKEN } from '../app/modals/profile/profile';
import { ProfileComponent } from '../app/modals/profile/profile.component';

const card = storiesOf('Modals/User', module).addDecorator(
  moduleMetadata({
    imports: [ModalsModule, ModalModule.forRoot()],
    providers: [
      MDBModalRef,
      { provide: PROFILE_TOKEN, useValue: ProfileComponent },
      { provide: MY_DATA_TOKEN, useValue: MyDataComponent },
      { provide: ADDRESSES_TOKEN, useValue: AddressesComponent },
      { provide: ADDRESS_FORM_TOKEN, useValue: AddressFormComponent },
      { provide: ORDERS_TOKEN, useValue: OrdersComponent },
      { provide: ORDER_DETAIL_TOKEN, useValue: OrderDetailComponent },
    ],
  })
);

card.add('Select', () => {
  return {
    component: ProfileComponent,
    props: {},
  };
});

card.add('Data', () => {
  return {
    component: MyDataComponent,
    props: {},
  };
});

card.add('Addresses', () => {
  return {
    component: AddressesComponent,
    props: {
      addresses: object('addresses', addresses)
    },
  };
});

card.add('Address Form Create', () => {
  return {
    component: AddressFormComponent,
    props: {
      address: null
    },
  };
});

card.add('Address Form Edit', () => {
  return {
    component: AddressFormComponent,
    props: {
      address: object('address', addressItem)
    },
  };
});

card.add('Orders', () => {
  return {
    component: OrdersComponent,
    props: {
      orders: object('orders', orders),
    },
  };
});

card.add('Order Detail', () => {
  return {
    component: OrderDetailComponent,
    props: {
      order: object('order', orderItem),
    },
  };
});

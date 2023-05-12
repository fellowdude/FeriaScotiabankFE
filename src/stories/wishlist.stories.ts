import { object } from '@storybook/addon-knobs';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { MDBModalRef, ModalModule } from 'angular-bootstrap-md';

import { ModalsModule } from '../app/modals/modals.module';
import { WishlistComponent } from '../app/modals/wishlist/wishlist.component';
import { wishlist } from '../app/mockups/wishlist.mockup'

const card = storiesOf('Modals/Wishlist', module).addDecorator(
  moduleMetadata({
    imports: [ModalsModule, ModalModule.forRoot()],
    providers: [MDBModalRef]
  })
);

card.add('List', () => {
  return {
    component: WishlistComponent,
    props: {
      wishlist: object('wihslist', wishlist),
    },
  };
});

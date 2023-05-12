// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { object, boolean, select, number } from '@storybook/addon-knobs';
import { SharedModule } from '../app/shared/shared.module';
import { ProductItemComponent } from '../app/shared/product-item/product-item.component';
import { product, products } from '../app/mockups/product.mockup';
import { ProductListComponent } from '../app/shared/product-list/product-list.component';
import { ProductListMenuComponent } from '../app/shared/product-list-menu/product-list-menu.component';
import { category } from '../app/mockups/category.mockup';
import { ProductListNavComponent } from '../app/shared/product-list-nav/product-list-nav.component';

const card = storiesOf('Product', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule],
  })
);

card.add('Product Item', () => {
  return {
    component: ProductItemComponent,
    props: {
      type: select('type', ['simple', 'star', 'discount', 'scotia'], 'scotia'),
      product: object('product', product),
    },
  };
});
card.add('Product List', () => {
  return {
    component: ProductListComponent,
    props: {
      products: object('products', products),
      type: select('type', ['simple', 'star', 'discount', 'scotia'], 'scotia'),
      isPaginated: boolean('isPaginated', true),
      itemsPerPage: number('itemsPerPage', 10),
    },
  };
});
card.add('Product List Menu', () => {
  return {
    component: ProductListMenuComponent,
    props: {
      categories: object('categories', category.subcategoryList),
      _brands: object('_brands', category.subcategoryList),
    },
  };
});
card.add('Product List Nav', () => {
  return {
    component: ProductListNavComponent,
    props: {
      isOrderByVisible: boolean('isOrderByVisible', false),
    },
  };
});

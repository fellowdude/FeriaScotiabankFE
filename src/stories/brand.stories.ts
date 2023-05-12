import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CategoryModule } from '../app/core/category/category.module';
import { CategoryBrandListComponent } from '../app/core/category/category-brand-list/category-brand-list.component';
import { CategoryBrandCardComponent } from '../app/core/category/category-brand-card/category-brand-card.component';
import { object, select } from '@storybook/addon-knobs';
import { categoryGroups } from '../app/mockups/category-group.mockup';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

const card = storiesOf('Brand', module).addDecorator(
  moduleMetadata({
    imports: [CategoryModule, HttpClientModule, RouterTestingModule],
  })
);

card.add('Brand List', () => {
  return {
    component: CategoryBrandListComponent,
    props: {
      type: select('type', ['carousel', 'grid'], 'carousel'),
      categories: object('categories', categoryGroups),
    },
  };
});
card.add('Brand Card', () => {
  return {
    component: CategoryBrandCardComponent,
    props: {},
  };
});

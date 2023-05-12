// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { object, select } from '@storybook/addon-knobs';
import { CategoryModule } from '../app/core/category/category.module';
import { CategoryComponent } from '../app/core/category/category.component';
import { CategoryCardComponent } from '../app/core/category/category-card/category-card.component';
import { CategoryListComponent } from '../app/core/category/category-list/category-list.component';
import { categories, category } from '../app/mockups/category.mockup';
import { CategoryHeroComponent } from '../app/core/category/category-hero/category-hero.component';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { mockResolver } from '../app/mockups/category-group.mockup';
import { HttpClientModule } from '@angular/common/http';

const card = storiesOf('Category', module).addDecorator(
  moduleMetadata({
    imports: [CategoryModule, RouterTestingModule, HttpClientModule],
    providers: [
      { provide: APP_BASE_HREF, useValue: '/' },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: {
              resolved: mockResolver,
            },
          },
        },
      },
    ],
  })
);

card.add('Category', () => {
  return {
    component: CategoryComponent,
    props: {},
  };
});
card.add('Hero', () => {
  return {
    component: CategoryHeroComponent,
    props: {},
  };
});
card.add('Card', () => {
  return {
    component: CategoryCardComponent,
    props: {
      category: object('category', category),
      type: select('type', ['carousel', 'grid'], 'carousel'),
    },
  };
});
card.add('List', () => {
  return {
    component: CategoryListComponent,
    props: {
      categories: object('categories', categories),
      type: select('type', ['carousel', 'grid'], 'carousel'),
    },
  };
});

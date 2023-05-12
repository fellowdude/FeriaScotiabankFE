// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { object, text } from '@storybook/addon-knobs';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeModule } from '../app/core/home/home.module';
import { HomeHeroComponent } from '../app/core/home/home-hero/home-hero.component';
import { HomeComponent } from '../app/core/home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { homeHeroList, mockResolver } from '../app/mockups/home.mockup';
import { HomePaymentCardComponent } from '../app/core/home/home-payment-card/home-payment-card.component';
import { payments } from '../app/static/home.static';
import { HomePaymentListComponent } from '../app/core/home/home-payment-list/home-payment-list.component';
import { HomeBannerListComponent } from '../app/core/home/home-banner-list/home-banner-list.component';
import { banners } from '../app/mockups/banner.mockup';
import { ModalModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

const card = storiesOf('Home', module).addDecorator(
  moduleMetadata({
    imports: [RouterTestingModule, HomeModule, ModalModule.forRoot(), HttpClientModule],
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

card.add('Home', () => {
  return {
    component: HomeComponent,
    props: {},
  };
});
card.add('Hero', () => {
  return {
    component: HomeHeroComponent,
    props: {},
  };
});
card.add('HeroList', () => {
  return {
    component: HomeBannerListComponent,
    props: {
      heroList: homeHeroList,
    },
  };
});
card.add('Payment Card', () => {
  return {
    component: HomePaymentCardComponent,
    props: {
      color: text('color', 'purple'),
      payment: object('payment', payments[0]),
    },
  };
});
card.add('Payment Card List', () => {
  return {
    component: HomePaymentListComponent,
    props: {
      payments: object('payments', payments),
    },
  };
});
card.add('Banner List', () => {
  return {
    component: HomeBannerListComponent,
    props: {
      banners: object('banners', banners),
    },
  };
});

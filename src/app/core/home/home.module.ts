import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { WavesModule, IconsModule } from 'angular-bootstrap-md';
import { MicroModule } from 'src/app/micro/micro.module';
import {
  SwiperModule,
  SwiperConfigInterface,
  SWIPER_CONFIG,
} from 'ngx-swiper-wrapper';
import { CategoryModule } from '../category/category.module';
import { CampaignModule } from '../campaign/campaign.module';
import { HomeResolver } from '../../resolvers/home.resolver';
import { HomePaymentCardComponent } from './home-payment-card/home-payment-card.component';
import { HomePaymentListComponent } from './home-payment-list/home-payment-list.component';
import { HomeBannerListComponent } from './home-banner-list/home-banner-list.component';
import { ModalsModule } from 'src/app/modals/modals.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HomeHeroListComponent } from './home-hero-list/home-hero-list.component';
import { HomePopUpComponent } from './home-pop-up/home-pop-up.component';

const homeRoutes: Routes = [
  {
    path: 'home',
    resolve: { resolved: HomeResolver },
    component: HomeComponent,
  },
];
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  initialSlide: 1, // TODO not hardcode this variable (it's static content but it may change in the future)
  a11y: false,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: true,
  pagination: false,
  spaceBetween: 0,
};
@NgModule({
  declarations: [
    HomeComponent,
    HomeHeroComponent,
    HomePaymentCardComponent,
    HomePaymentListComponent,
    HomeBannerListComponent,
    HomeHeroListComponent,
    HomePopUpComponent,
  ],
  imports: [
    CommonModule,
    WavesModule,
    MicroModule,
    SwiperModule,
    IconsModule,
    CategoryModule,
    CampaignModule,
    SharedModule,
    LazyLoadImageModule,
    ModalsModule,
    RouterModule.forChild(homeRoutes),
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class HomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GlobalLoadingComponent } from './global-loading/global-loading.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';

import { MicroModule } from '../micro/micro.module';
import {
  IconsModule,
  CarouselModule,
  WavesModule,
  ModalModule,
  CollapseModule,
  CheckboxModule,
  BadgeModule,
} from 'angular-bootstrap-md';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { BannerComponent } from './banner/banner.component';
import { ProductListComponent } from './product-list/product-list.component';

import { ModalsModule } from 'src/app/modals/modals.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ProfileComponent } from '../modals/profile/profile.component';
import { LoginComponent } from '../modals/login/login.component';
import { WishlistComponent } from '../modals/wishlist/wishlist.component';
import { CartComponent } from '../modals/cart/cart.component';
import { NavBarMobileComponent } from './header/nav-bar-mobile/nav-bar-mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SimpleCardComponent } from './simple-card/simple-card.component';
import { PageHeroComponent } from './page-hero/page-hero.component';
import { SingleAccordionComponent } from './single-accordion/single-accordion.component';
import { FormComponent } from './form/form.component';
import { ProductListMenuComponent } from './product-list-menu/product-list-menu.component';
import { ProductListNavComponent } from './product-list-nav/product-list-nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SubNavBarComponent } from './header/sub-nav-bar/sub-nav-bar.component';
import { HammerModule } from '@angular/platform-browser';
import { ZoomAreaComponent } from './zoom-area/zoom-area.component';
import { VerificationPageComponent } from './verification-page/verification-page.component';
import { LoadingVerificationComponent } from './loading-verification/loading-verification.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    GlobalLoadingComponent,
    ProductItemComponent,
    NavBarComponent,
    MainCarouselComponent,
    BannerComponent,
    ProductListComponent,
    NavBarMobileComponent,
    SimpleCardComponent,
    PageHeroComponent,
    SingleAccordionComponent,
    FormComponent,
    ProductListMenuComponent,
    ProductListNavComponent,
    SubNavBarComponent,
    ZoomAreaComponent,
    VerificationPageComponent,
    LoadingVerificationComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    CarouselModule,
    MicroModule,
    DirectivesModule,
    WavesModule,
    ModalModule,
    ModalsModule,
    CheckboxModule,
    CollapseModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    RouterModule,
    BadgeModule,
    HammerModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    GlobalLoadingComponent,
    ProductItemComponent,
    NavBarComponent,
    MainCarouselComponent,
    ProductListComponent,
    BannerComponent,
    SimpleCardComponent,
    PageHeroComponent,
    SingleAccordionComponent,
    FormComponent,
    ProductListNavComponent,
    ZoomAreaComponent,
    LoadingVerificationComponent,
  ],
  entryComponents: [
    ProfileComponent,
    LoginComponent,
    WishlistComponent,
    CartComponent,
  ],
})
export class SharedModule {}

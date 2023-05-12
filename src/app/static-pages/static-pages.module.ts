import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ComplaintsBookComponent } from './complaints-book/complaints-book.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { FaqComponent } from './faq/faq.component';
import { HowToBuyComponent } from './how-to-buy/how-to-buy.component';
import { DeliveryServiceComponent } from './delivery-service/delivery-service.component';
import { RefundComponent } from './refund/refund.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { NewCardComponent } from './new-card/new-card.component';
import { BioSecurityComponent } from './bio-security/bio-security.component';

import { BioSecurityResolver } from 'src/app/resolvers/static-pages/bio-security.resolver';
import { ComplaintsBookResolver } from 'src/app/resolvers/static-pages/complaints-book.resolver';
import { ContactUsResolver } from 'src/app/resolvers/static-pages/contact-us.resolver';
import { CustomerServiceResolver } from 'src/app/resolvers/static-pages/customer-service.resolver';
import { DeliveryServiceResolver } from 'src/app/resolvers/static-pages/delivery-service.resolver';
import { FAQResolver } from 'src/app/resolvers/static-pages/faq.resolver';
import { HowToBuy } from 'src/app/resolvers/static-pages/how-to-buy.resolver';
import { NewCardResolver } from 'src/app/resolvers/static-pages/new-card.resolver';
import { RefundResolver } from 'src/app/resolvers/static-pages/refund.resolver';
import { TermsAndConditionsResolver } from 'src/app/resolvers/static-pages/terms-and-conditions.resolver';
import { PayMethodResolver } from 'src/app/resolvers/static-pages/pay-method.resolver';
import { SharedModule } from '../shared/shared.module';
import {
  SwiperConfigInterface,
  SwiperModule,
  SWIPER_CONFIG,
} from 'ngx-swiper-wrapper';
import { MicroModule } from '../micro/micro.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PrivacyComponent } from './privacy/privacy.component';
import { PayMethodComponent } from './pay-method/pay-method.component';
import { PrivacyResolver } from '../resolvers/static-pages/privacy.resolver';

const staticPagesRoutes: Routes = [
  { path: '', redirectTo: 'contact-us', pathMatch: 'full' },
  {
    path: 'complaints-book',
    component: ComplaintsBookComponent,
    resolve: { resolved: ComplaintsBookResolver },
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    resolve: { resolved: ContactUsResolver },
  },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
    resolve: { resolved: TermsAndConditionsResolver },
  },
  { path: 'faq', component: FaqComponent, resolve: { resolved: FAQResolver } },
  {
    path: 'how-to-buy',
    component: HowToBuyComponent,
    resolve: { resolved: HowToBuy },
  },
  {
    path: 'delivery-service',
    component: DeliveryServiceComponent,
    resolve: { resolved: DeliveryServiceResolver },
  },
  {
    path: 'refund',
    component: RefundComponent,
    resolve: { resolved: RefundResolver },
  },
  {
    path: 'customer-service',
    component: CustomerServiceComponent,
    resolve: { resolved: CustomerServiceResolver },
  },
  {
    path: 'new-card',
    component: NewCardComponent,
    resolve: { resolved: NewCardResolver },
  },
  {
    path: 'bio-security',
    component: BioSecurityComponent,
    resolve: { resolved: BioSecurityResolver },
  },
  {
    path: 'pay-method',
    component: PayMethodComponent,
    resolve: { resolved: PayMethodResolver },
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    resolve: { resolved: PrivacyResolver },
  },
];
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 2,
  initialSlide: 0,
  a11y: false,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: true,
  pagination: false,
  spaceBetween: 0,
  loop: false,
  autoplay: {
    delay: 5000,
  },
};
@NgModule({
  declarations: [
    ComplaintsBookComponent,
    ContactUsComponent,
    NotFoundComponent,
    TermsAndConditionsComponent,
    FaqComponent,
    HowToBuyComponent,
    DeliveryServiceComponent,
    RefundComponent,
    CustomerServiceComponent,
    NewCardComponent,
    BioSecurityComponent,
    PrivacyComponent,
    PayMethodComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SwiperModule,
    MicroModule,
    LazyLoadImageModule,
    RouterModule.forChild(staticPagesRoutes),
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class StaticPagesModule {}

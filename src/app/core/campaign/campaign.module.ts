import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CampaignResolver } from '../../resolvers/campaign.resolver';
import { CampaignComponent } from './campaign.component';
import { CampaignHeroComponent } from './campaign-hero/campaign-hero.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MicroModule } from '../../micro/micro.module';
import { CampaignBrandListComponent } from './campaign-brand-list/campaign-brand-list.component';
import {
  SwiperModule,
  SWIPER_CONFIG,
  SwiperConfigInterface,
} from 'ngx-swiper-wrapper';
import { CampaignBrandCardComponent } from './campaign-brand-card/campaign-brand-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'campaign/:friendlyUrl',
    resolve: { resolved: CampaignResolver },
    runGuardsAndResolvers: 'always',
    component: CampaignComponent,
  },
];

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 2,
  a11y: false,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: false,
  pagination: false,
  spaceBetween: 0,
};

@NgModule({
  declarations: [CampaignComponent, CampaignHeroComponent, CampaignBrandListComponent, CampaignBrandCardComponent],
  imports: [
    LazyLoadImageModule,
    MicroModule,
    SwiperModule,
    SharedModule,
    CommonModule, RouterModule.forChild(routes)
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class CampaignModule {}

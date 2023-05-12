import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';
import { MicroModule } from '../../micro/micro.module';
import { SharedModule } from '../../shared/shared.module';
import { WavesModule, IconsModule } from 'angular-bootstrap-md';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryBrandListComponent } from './category-brand-list/category-brand-list.component';
import {
  SwiperModule,
  SWIPER_CONFIG,
  SwiperConfigInterface,
} from 'ngx-swiper-wrapper';
import { CategoryHeroComponent } from './category-hero/category-hero.component';
import { CategoryBrandCardComponent } from './category-brand-card/category-brand-card.component';
import { CategoryResolver } from 'src/app/resolvers/category.resolver';
import { BrandResolver } from 'src/app/resolvers/brand.resolver';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const routes: Routes = [
  {
    path: 'category/:friendlyUrl',
    resolve: { resolved: CategoryResolver },
    runGuardsAndResolvers: 'always',
    component: CategoryComponent,
  },
  {
    path: 'category/:friendlyUrl/brand/:brandFriendlyUrl',
    resolve: { resolved: BrandResolver },
    runGuardsAndResolvers: 'always',
    component: CategoryComponent,
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
  declarations: [
    CategoryComponent,
    CategoryListComponent,
    CategoryCardComponent,
    CategoryHeroComponent,
    CategoryBrandListComponent,
    CategoryBrandCardComponent,
  ],
  imports: [
    CommonModule,
    WavesModule,
    MicroModule,
    SwiperModule,
    IconsModule,
    LazyLoadImageModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [CategoryListComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class CategoryModule {}

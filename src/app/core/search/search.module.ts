import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule, Routes } from '@angular/router';
import {
  SwiperModule,
  SwiperConfigInterface,
  SWIPER_CONFIG,
} from 'ngx-swiper-wrapper';
import { SearchResolver } from 'src/app/resolvers/search.resolver'
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
const searchRoutes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
    runGuardsAndResolvers: 'always',
    resolve: { resolved: SearchResolver }
  },
];

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  a11y: false,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: true,
  pagination: false,
  spaceBetween: 0,
};

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SwiperModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild(searchRoutes),
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
})
export class SearchModule { }

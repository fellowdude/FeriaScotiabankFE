import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  SwiperDirective,
  SwiperConfigInterface,
  SWIPER_CONFIG,
} from 'ngx-swiper-wrapper';
import { CategoryBrandListType } from 'src/app/models/category.model';
import { IBrandBackend } from 'src/app/services/category.service';

const CUSTOM_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 2,
  a11y: false,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: true,
  pagination: true,
  spaceBetween: 0,
  autoplay: {
    delay: 2000
  },
  breakpoints: {
    // when window width is >= $px
    768: {
      //md
      slidesPerView: 2,
    },
    992: {
      //lg
      slidesPerView: 3,
    },
    1200: {
      //xl
      slidesPerView: 4,
    },
    1600: {
      //xxl
      slidesPerView: 5,
    },
  },
};
@Component({
  selector: 'app-category-brand-list',
  templateUrl: './category-brand-list.component.html',
  styleUrls: ['./category-brand-list.component.scss'],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: CUSTOM_SWIPER_CONFIG,
    },
  ],
})
export class CategoryBrandListComponent implements OnInit {
  @Input() _brands: IBrandBackend[] = [];
  @Input() type: CategoryBrandListType = 'carousel';
  @ViewChild(SwiperDirective) swiperDirective: SwiperDirective;
  shuffledBrands: IBrandBackend[] = [];
  constructor() {}

  ngOnInit(): void {
    this.shuffledBrands = [...this._brands];
    this.shuffledBrands = this.shuffledBrands.sort((a,b) => 0.5 - Math.random());
  }
}

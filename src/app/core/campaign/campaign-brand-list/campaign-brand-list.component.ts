import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  SwiperDirective,
  SwiperConfigInterface,
  SWIPER_CONFIG,
} from 'ngx-swiper-wrapper';

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
  selector: 'app-campaign-brand-list',
  templateUrl: './campaign-brand-list.component.html',
  styleUrls: ['./campaign-brand-list.component.scss'],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: CUSTOM_SWIPER_CONFIG,
    },
  ],
})
export class CampaignBrandListComponent implements OnInit {
  @Input() _brands: Array<any> = [];
  @Input() type: any = 'carousel';
  @ViewChild(SwiperDirective) swiperDirective: SwiperDirective;
  constructor() { }

  ngOnInit(): void {
  }

}

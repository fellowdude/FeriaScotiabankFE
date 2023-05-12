import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IHomeHero } from 'src/app/models/static-pages.model';

@Component({
  selector: 'app-home-hero-list',
  templateUrl: './home-hero-list.component.html',
  styleUrls: ['./home-hero-list.component.scss'],
})
export class HomeHeroListComponent implements OnInit {
  @Input() heroes: IHomeHero[];
  configSwiper: SwiperConfigInterface = {
    loop: false,
    initialSlide: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
  };

  constructor() {}

  ngOnInit(): void {}
}

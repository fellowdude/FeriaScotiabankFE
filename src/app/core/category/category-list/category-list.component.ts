import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CategoryListType } from 'src/app/models/category.model';
import {
  SwiperDirective,
  SwiperConfigInterface,
  SWIPER_CONFIG,
} from 'ngx-swiper-wrapper';
import { ICategoryBackend } from 'src/app/services/category.service';

const CUSTOM_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 2,
  a11y: false,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: false,
  pagination: false,
  spaceBetween: 0,
  initialSlide: 1
};
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: CUSTOM_SWIPER_CONFIG,
    },
  ],
})
export class CategoryListComponent implements OnInit {
  @Input() categories: ICategoryBackend[] = [];
  @Input() type: CategoryListType = 'grid';
  cardColors = [
    'purple',
    'pink',
    'yellow',
    'orange',
    'green',
    'blue'
  ];

  @ViewChild(SwiperDirective) swiperDirective: SwiperDirective;

  constructor() {}

  ngOnInit(): void {}
}

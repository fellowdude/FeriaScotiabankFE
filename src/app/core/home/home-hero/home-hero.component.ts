import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SwiperDirective } from 'ngx-swiper-wrapper';
import { IHomeHero } from 'src/app/models/static-pages.model';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss'],
})
export class HomeHeroComponent implements OnInit {
  @Input() hero: IHomeHero;

  @ViewChild(SwiperDirective) swiperDirective: SwiperDirective;

  constructor() {}

  ngOnInit(): void {}
}

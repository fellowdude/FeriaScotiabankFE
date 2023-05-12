import { Component, Input, OnInit } from '@angular/core';
import { IComplexCard } from 'src/app/models/static-pages.model';

@Component({
  selector: 'app-home-banner-list',
  templateUrl: './home-banner-list.component.html',
  styleUrls: ['./home-banner-list.component.scss'],
})
export class HomeBannerListComponent implements OnInit {
  @Input() banners: IComplexCard[];
  cardColors = ['white', 'white', 'white'];
  constructor() {}

  ngOnInit(): void {}
}

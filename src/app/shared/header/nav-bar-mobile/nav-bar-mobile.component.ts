import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { INavBar, INavBarItem } from 'src/app/models/navbar.model';

@Component({
  selector: 'app-nav-bar-mobile',
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.scss'],
})
export class NavBarMobileComponent implements OnInit {
  show: boolean = false;
  selectedCategory: INavBarItem;
  selectedIndex: number;

  @Input() config: INavBar;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {}

  toggleNavBar(): void {
    this.show = !this.show;
    this.selectedCategory = null;
    this.selectedIndex = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('filter');
      localStorage.removeItem('page');
    }
  }

  selectCategory(item: INavBarItem, index: number): void {
    this.selectedCategory = item;
    this.selectedIndex = index;
  }

  deselectCategory(): void {
    this.selectedCategory = null;
  }
}

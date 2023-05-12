import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { INavBar, INavBarItem } from '../../../models/navbar.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
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
  }

  selectCategory(item: INavBarItem, index: number): void {
    this.selectedCategory = item;
    this.selectedIndex = index;
  }

  deselectCategory(): void {
    this.selectedCategory = null;
  }

  changeFilter(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('filter');
      localStorage.removeItem('page');
    }
  }
}

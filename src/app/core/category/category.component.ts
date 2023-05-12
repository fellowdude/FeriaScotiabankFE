import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ICategoryPage } from '../../resolvers/category.resolver';
import { ActivatedRoute } from '@angular/router';
import {
  CategoryService,
  IBrandBackend,
  ICategoryBackend,
} from 'src/app/services/category.service';
import { IBrandPage } from 'src/app/resolvers/brand.resolver';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  get resolvedData(): ICategoryPage | IBrandPage {
    return this.route.snapshot.data['resolved'] as ICategoryPage | IBrandPage;
  }

  category: ICategoryBackend;
  _brands: IBrandBackend[] = [];
  _brand: IBrandBackend;
  isBrandPage = false;
  itemsPerPage: number = 12;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private route: ActivatedRoute,
    private catService: CategoryService,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('pageS');
    }

    if (isPlatformBrowser(this.platformId) && window.innerWidth > 1600) {
      this.itemsPerPage = 10;
    } else {
      this.itemsPerPage = 12;
    }
    this.catService.category = this.resolvedData.category;
    this.catService.brand = (this.resolvedData as IBrandPage)._brand;

    this.category = this.resolvedData.category;
    this.isBrandPage = this.resolvedData.isBrandPage;
    if (this.isBrandPage) {
      this._brand = (this.resolvedData as IBrandPage)._brand;
    } else this._brands = (this.resolvedData as ICategoryPage)._brands;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 1600) {
      this.itemsPerPage = 10;
    } else {
      this.itemsPerPage = 12;
    }
  }
}

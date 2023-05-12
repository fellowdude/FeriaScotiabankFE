import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  HostListener,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { ProductItemType } from 'src/app/models/product.model';
import {
  CategoryService,
  IBrandBackend,
  IFilterBackend,
} from 'src/app/services/category.service';
import {
  IProductBackend,
  ProductService,
} from 'src/app/services/product.service';
import { GtagService } from 'src/app/gtag/gtag.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() products: IProductBackend[] = [];
  @Input() filters: IFilterBackend[] = [];
  @Input() _brands: IBrandBackend[] = [];
  @Input() type: ProductItemType = 'scotia';
  @Input() title: string;
  @Input() isPaginated = false;
  @Input() isFiltered = false;
  @Input() isOrdered = false;
  @Input() isInfinite = false;
  @Input() isSearch = false;
  @Input() searchValue = null;
  @Input() itemsPerPage = 8;
  @Input() loading = true;
  currentPage = 1;
  sortValue: any = null;
  sortPos: number = 0;
  menuFilters: any = {};
  isMenuToggled = false;
  isiOS: boolean = false;
  isMobile: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private productService: ProductService,
    private catService: CategoryService,
    private gtag: GtagService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      var isMobile = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return (
            navigator.userAgent.match(/IEMobile/i) ||
            navigator.userAgent.match(/WPDesktop/i)
          );
        },
        any: function () {
          return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera()
          );
        },
      };
      if (isMobile.any()) this.isMobile = true;
      if (this.isInfinite) this.loading = false;
      this.isiOS = this.iOS();

      if (isPlatformBrowser(this.platformId) && localStorage.getItem('page')) {
        this.pageChanged(Number(localStorage.getItem('page')));
      }

      if (isPlatformBrowser(this.platformId) && localStorage.getItem('pageS')) {
        this.pageChanged(Number(localStorage.getItem('pageS')));
      }

      this.gtag.viewItemList(
        this.products.map((product, index) => ({
          id: product?.SKU,
          name: product?.name,
          brand: product?.brand?.name,
          price: product?.special_price,
          list_position: index + 1 + (this.currentPage - 1) * 12,
          list_name: this.title,
          category: product.categories[0].name,
        }))
      );
    }
  }

  pageChanged(index) {
    this.currentPage = index;
    if (isPlatformBrowser(this.platformId)) {
      if (this.isSearch && this.itemsPerPage > 4) {
        localStorage.setItem('pageS', String(index));
      } else {
        this.itemsPerPage > 4 && localStorage.setItem('page', String(index));
      }

      if (this.isMobile && isPlatformBrowser(this.platformId))
        window.scroll(0, 0);
    }
  }

  sortChanged(sort?: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('page');
      localStorage.removeItem('pageS');
    }

    switch (Number(sort)) {
      case 1: {
        this.sortValue = { filter: 'price', value: -1 };
        break;
      }
      case 2: {
        this.sortValue = { filter: 'price', value: 1 };
        break;
      }
      case 3: {
        this.sortValue = { filter: 'name', value: 1 };
        break;
      }
      case 4: {
        this.sortValue = { filter: 'name', value: -1 };
        break;
      }
      case 0 || 5: {
        this.sortValue = null;
        break;
      }
      default: {
        this.sortValue = null;
        break;
      }
    }
    this.menuChanged(this.menuFilters);
  }

  menuChanged(menuFilters) {
    this.loading = true;
    this.menuFilters = menuFilters;

    if (isPlatformBrowser(this.platformId)) {
      if (
        this.menuFilters &&
        this.menuFilters.length > 0 &&
        !this.catService.brand
      )
        localStorage.setItem('filter', JSON.stringify(this.menuFilters));
      else if (!this.catService.brand) localStorage.removeItem('filter');

      if (this.isSearch) {
        if (localStorage.getItem('pageS')) {
          this.pageChanged(Number(localStorage.getItem('pageS')));
          localStorage.removeItem('pageS');
        } else {
          this.pageChanged(1);
        }
      } else {
        if (localStorage.getItem('page')) {
          this.pageChanged(Number(localStorage.getItem('page')));
          localStorage.removeItem('page');
        } else {
          this.pageChanged(1);
        }
      }
    }
    this.productService
      .getProducts(
        this.menuFilters,
        !this.isSearch ? this.catService.category._id : null,
        this.sortValue,
        this.isSearch ? this.searchValue : null
      )
      .subscribe((res) => {
        this.products = res;

        this.gtag.viewItemList(
          this.products.map((product, index) => ({
            id: product?.SKU,
            name: product?.name,
            brand: product?.brand?.name,
            price: product?.special_price,
            list_position: index + 1 + (this.currentPage - 1) * 12,
            list_name: this.title,
            category: product.categories[0].name,
          }))
        );
        if (this.isMobile && isPlatformBrowser(this.platformId))
          window.scroll(0, 0);
        this.loading = false;
      });
  }

  getRandomProducts() {
    if (this.loading) return;
    this.loading = true;
    this.productService.getFeaturedProducts(40).subscribe((res) => {
      this.products = res;
      this.gtag.viewItemList(
        this.products.map((product, index) => ({
          id: product?.SKU,
          name: product?.name,
          brand: product?.brand?.name,
          price: product?.special_price,
          list_position: index + 1 + (this.currentPage - 1) * 12,
          list_name: this.title,
          category: product.categories[0].name,
        }))
      );
      this.itemsPerPage = this.products.length;
      this.loading = false;
    });
  }

  iOS(): boolean {
    return (
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    );
  }
}

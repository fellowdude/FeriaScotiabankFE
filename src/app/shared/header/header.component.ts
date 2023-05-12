import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { INavBar } from 'src/app/models/navbar.model';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from 'src/app/modals/profile/profile.component';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { WishlistComponent } from 'src/app/modals/wishlist/wishlist.component';
import { CartComponent } from 'src/app/modals/cart/cart.component';
import { NavBarMobileComponent } from './nav-bar-mobile/nav-bar-mobile.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { navBar } from 'src/app/mockups/header.mockup';
import {
  CategoryService,
  ICategoryListBackend,
} from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/internal/header.service';
import { ICommunicartionHeader } from 'src/app/models/communitacion.model';
import { WishlistService } from 'src/app/services/wishlist.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { isPlatformBrowser } from '@angular/common';
import { VerifyCodeService } from 'src/app/services/verify-code.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  modalRef: MDBModalRef;
  searchForm: FormGroup;
  cartSize: number = 0;
  wishlistSize: number = 0;
  loadingSearch: boolean = false;
  profileName: string = null;
  @Input() user: boolean;
  @Input() navBarListConfig: INavBar = navBar;

  @ViewChild('navBar', { static: true }) navBar: NavBarComponent;
  @ViewChild('navBarMobile', { static: true })
  navBarMobile: NavBarMobileComponent;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private modalService: MDBModalService,
    private router: Router,
    private profileService: UserProfileService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private headerInternalService: HeaderService,
    private wishistService: WishlistService,
    private verifyCodeService: VerifyCodeService
  ) {
    this.headerInternalService.subscriber$.subscribe(
      (data: ICommunicartionHeader) => {
        if (data.type == 'LOGIN_SUCCESS') {
          this.updateLogged();
          this.updateCartSize();
          this.updateWishlistSize();
          this.updateUserInfo();
        }
        if (data.type == 'SESSION_CLOSED') {
          this.updateLogged();
          this.cartSize = 0;
          this.wishlistSize = 0;
        }
        if (data.type == 'UPDATE_CART') {
          this.updateCartSize();
        }
        if (data.type == 'UPDATE_WISHLIST') {
          this.updateWishlistSize();
        }
        if (data.type == 'SEARCH_LOAD') {
          this.loadingSearch = false;
        }
      }
    );
  }

  ngOnInit(): void {
    this.updateLogged();
    this.updateCartSize();
    this.updateWishlistSize();
    this.updateUserInfo();

    this.searchForm = new FormGroup({
      filter: new FormControl('', [Validators.required]),
    });

    this.categoryService
      .getCategoryList()
      .subscribe((result: ICategoryListBackend) => {
        this.navBarListConfig = {
          navBarList: [],
        };
        result.data.forEach((category) => {
          this.navBarListConfig.navBarList.push({
            name: category.name,
            categoryList: [],
            selected: false,
            friendlyUrl: category.friendly_url,
          });
          category.filters[0]?.values.forEach((filter) => {
            this.navBarListConfig.navBarList[
              this.navBarListConfig.navBarList.length - 1
            ].categoryList.push({
              name: filter,
              filter: category.filters[0].filter,
            });
          });
        });
      });

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.verifyCodeService.verifyAccessCodeAndNavigate();
      });
    }
  }

  updateLogged(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.user = localStorage.getItem('jwt') ? true : false;
    }
  }

  updateCartSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('jwt')) {
        this.cartService.cartSize().subscribe((result) => {
          this.cartSize = result?.total_item || 0;
        });
      }
    }
  }

  updateWishlistSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('jwt')) {
        this.wishistService.getTotalWishlist().subscribe((result) => {
          this.wishlistSize = result?.wishlist || 0;
        });
      }
    }
  }

  updateUserInfo(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('jwt')) {
        this.profileService.userData().subscribe((result: any) => {
          this.profileName =
            result?.name?.charAt(0).toUpperCase() + result?.name?.slice(1);
        });
      } else {
        this.profileName = null;
      }
    }
  }

  setFilter(e): void {
    if (e.keyCode == 13 && !this.loadingSearch) {
      this.loadingSearch = true;
      let str = this.searchForm.controls['filter'].value;
      let filter = str.replace(/^\s+|\s+$/g, '');
      this.router.navigate(['/main/search'], {
        queryParams: { filter: filter },
      });
      this.searchForm.reset();
    }
  }

  findByFilter(): void {
    if (!this.loadingSearch) {
      this.loadingSearch = true;
      let str = this.searchForm.controls['filter'].value;
      let filter = str.replace(/^\s+|\s+$/g, '');
      this.router.navigate(['/main/search'], {
        queryParams: { filter: filter },
      });
      this.searchForm.reset();
    }
  }

  showCategories() {
    this.navBar.toggleNavBar();
  }

  showCategoriesMobile() {
    this.navBarMobile.toggleNavBar();
  }

  openLogin() {
    this.modalRef = this.modalService.show(LoginComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
    this.modalService.closed.subscribe(
      () =>
        (this.user =
          isPlatformBrowser(this.platformId) && localStorage.getItem('jwt')
            ? true
            : false)
    );
  }

  openAccountData() {
    this.modalRef = this.modalService.show(ProfileComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  openWishlist() {
    this.modalRef = this.modalService.show(WishlistComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  openCart() {
    this.modalRef = this.modalService.show(CartComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }
}

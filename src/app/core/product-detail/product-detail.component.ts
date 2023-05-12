import {
  Component,
  OnInit,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { Constants } from 'src/app/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from 'src/app/services/internal/header.service';
import { IAccordion } from 'src/app/models/static-pages.model';
import { IProductBackend } from 'src/app/services/product.service';
import { IProductDetailPage } from 'src/app/resolvers/product-detail.resolver';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Messages } from 'src/app/messages';
import {
  SwiperConfigInterface,
  SwiperDirective,
  SWIPER_CONFIG,
} from 'ngx-swiper-wrapper';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from 'src/app/services/url.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { GtagService } from 'src/app/gtag/gtag.service';

const PD_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  a11y: false,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: true,
  pagination: true,
  spaceBetween: 16,
  breakpoints: {
    // when window width is >= $px
    576: {
      //sm
      slidesPerView: 6,
    },
    768: {
      //md
      slidesPerView: 6,
    },
    992: {
      //lg
      slidesPerView: 3,
    },
    1200: {
      //xl
      slidesPerView: 5,
    },
    1600: {
      //xxl
      slidesPerView: 6,
    },
  },
};
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: PD_SWIPER_CONFIG,
    },
  ],
})
export class ProductDetailComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as IProductDetailPage;
  }

  get category() {
    const _category = this.product.categories.find(
      (x) => x._id === this.catService.category?._id
    );
    return _category === undefined ? this.product.categories[0] : _category;
  }

  @ViewChild('productsFeatSwiper', { read: SwiperDirective })
  productsFeatSwiper: SwiperDirective;
  modalRef: MDBModalRef;

  productsFeatSwiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 2,
    a11y: false,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    pagination: false,
    navigation: true,
    spaceBetween: 0,
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

  pointsDivider = Constants.POINTS_DIVIDER;
  product: IProductBackend;
  productImgIndex = 0;
  productAccordionList: IAccordion[] = [];
  productStockList = [];
  productsFeat: IProductBackend[] = [];
  quantity: number = 1;
  loading: boolean = false;
  loadingWishlist: boolean = false;
  variationForm: FormGroup;
  hasVariation: boolean = false;
  correctVariation: boolean = false;
  incorrectVariation: boolean = false;
  activeWarranty: boolean = false;
  activeInstallation: boolean = false;
  renderGallery: boolean = true;

  // for redirect
  previousUrl: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catService: CategoryService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private headerInternalService: HeaderService,
    private modalService: MDBModalService,
    private toastrService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: any,
    private urlService: UrlService,
    private gtag: GtagService
  ) {}

  ngOnInit(): void {
    this.urlService.previousUrl$.subscribe((url) => {
      this.previousUrl = url;
    });
    this.product = this.resolvedData.product;
    this.product.supplier_delivery.delivery_postventa &&
      this.product.detail_list.push({
        title: 'Delivery y Postventa',
        description: this.product?.supplier_delivery.delivery_postventa,
      });
    if (this.product?.type_variation === 'B') {
      this.hasVariation = true;
      this.correctVariation = false;
      this.variationForm = new FormGroup({});
      this.product?.variation_father?.forEach((e) => {
        if (e?.value?.length > 0)
          this.variationForm.addControl(
            e.variation_name,
            new FormControl(null, [Validators.required])
          );
      });
    }
    this.product?.variation_father?.forEach((el) => {
      if (
        el.type === 'TEXT' &&
        el.value.length === 1 &&
        el.value[0].value.toLowerCase().replace('ú', 'u').trim() === 'unica'
      ) {
        this.variationSelect({
          option: el.value[0].value,
          name: el.variation_name,
        });
      }
      if (
        el.type === 'COLOR' &&
        el.value.length === 1 &&
        el.value[0].description.toLowerCase().replace('ú', 'u').trim() ===
          'unico'
      ) {
        this.variationSelect({
          option: el.value[0].value,
          name: el.variation_name,
        });
      }
    });
    this.setBaseProductInfo();

    //GTAG viewItem
    this.gtag.viewItem([
      {
        id: this.product?.SKU,
        name: this.product?.name,
        brand: this.product?.brand?.name,
        category: this.product.categories[0].name,
        price: this.product?.special_price,
        list_name: 'Product Detail',
      },
    ]);
  }

  setBaseProductInfo(): void {
    if (this.product.images_link.length === 0) {
      this.product.images_link.push(this.product.image_cover);
    }
    this.catService.urlAttachment = this.product.url_attachment;

    this.productsFeat = this.resolvedData.productsFeat;

    // Index 0 is not used for accordion
    this.productAccordionList = this.product.detail_list
      ? this.product.detail_list
          .slice(1)
          .filter((x) => x.description.length > 0)
          .map((x, index) => ({
            question: x && x.title,
            answer: x && x.description,
            opened: index === 0,
          }))
      : [];
    this.productStockList = new Array(
      this.product.stock > 50 ? 50 : this.product.stock
    );
  }

  addToCart(): void {
    if (this.product.stock > 0) {
      var cartProduct = {
        id_product: this.product._id,
        product: this.product,
        quantity: Number(this.quantity),
        warranty:
          this.activeWarranty && this.product?.warranty > 0 ? true : false,
        installation:
          this.activeInstallation && this.product?.installation > 0
            ? true
            : false,
      };
      if (isPlatformBrowser(this.platformId)) {
        if (localStorage.getItem('jwt')) {
          this.loading = true;
          this.cartService.createCartItem(cartProduct).subscribe(
            () => {
              // Success
              this.toastrService.success(Messages.successAddCart2, null, {
                timeOut: 7000,
              });
              this.toastrService.success(
                Messages.successAddCart,
                Messages.successTitle
              );
              this.headerInternalService.emitData({ type: 'UPDATE_CART' });
              this.product.stock -= this.quantity;

              if (this.product.stock > 0) {
                this.quantity = 1;
                this.productStockList = new Array(
                  this.product.stock > 50 ? 50 : this.product.stock
                );
              }

              //GTAG addToCart
              this.gtag.addToCart({
                currency: 'PEN',
                items: [
                  {
                    id: this.product.SKU,
                    name: this.product.name,
                    brand: this.product.brand?.name,
                    category: this.product?.categories[0]?.name,
                    quantity: Number(this.quantity),
                    price:
                      this.product.special_price +
                      (this.activeWarranty ? this.product.warranty : 0) +
                      (this.activeInstallation ? this.product.installation : 0),
                    list_name: 'Product Detail',
                    list_position: 1,
                  },
                ],
              });

              this.loading = false;
            },
            () => {
              // Error
              // TODO is this always no stock?
              this.toastrService.warning(
                Messages.noStockProduct,
                Messages.warningTitle
              );
              this.loading = false;
              this.product.stock = 0;
            }
          );
        } else {
          this.toastrService.warning(Messages.forcedLoginAddCart);
          this.modalRef = this.modalService.show(LoginComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: 'modal-full-height modal-right mh-100 my-0',
            containerClass: 'right modal-dialog-scrollable mh-100 my-0',
            animated: true,
            data: {
              cartProduct: cartProduct,
            },
          });
        }
      }
    } else {
      this.toastrService.warning(
        Messages.noStockProduct,
        Messages.warningTitle
      );
    }
  }

  addToWishlist(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('jwt')) {
        this.loadingWishlist = true;
        this.wishlistService
          .addToWishlist(this.product._id)
          .subscribe((result) => {
            // GTAG addToWishlist
            this.gtag.addToWishlist({
              currency: 'PEN',
              items: [
                {
                  id: this.product.SKU,
                  name: this.product.name,
                  brand: this.product?.brand?.name,
                  category: this.product?.categories[0]?.name,
                  quantity: Number(this.quantity),
                  price: this.product?.special_price,
                  list_name: 'Product Detail',
                },
              ],
            });
            this.toastrService.success(
              Messages.successAddWishlist,
              Messages.successTitle
            );
            this.loadingWishlist = false;
            this.product.productInWishList = true;
            this.headerInternalService.emitData({ type: 'UPDATE_WISHLIST' });
          });
      } else {
        this.toastrService.warning(Messages.forcedLoginWishlist);
        // TODO Forced login modal data
      }
    }
  }

  removeFromWishlist(): void {
    this.loadingWishlist = true;
    this.wishlistService.removeFromWishlist(this.product._id).subscribe(
      (result) => {
        // GTAG removeFromWishlist
        this.gtag.removeFromWishlist({
          currency: 'PEN',
          items: [
            {
              id: this.product?.SKU,
              name: this.product?.name,
              brand: this.product?.brand?.name,
              category: this.product?.categories[0]?.name,
              quantity: Number(this.quantity),
              price: this.product?.special_price,
            },
          ],
        });
        this.toastrService.success(
          Messages.successDeleteWishlist,
          Messages.successTitle
        );
        this.loadingWishlist = false;
        this.product.productInWishList = false;
        this.headerInternalService.emitData({ type: 'UPDATE_WISHLIST' });
      },
      () => {
        this.toastrService.warning(
          Messages.errorDeleteWishlist,
          Messages.warningTitle
        );
      }
    );
  }

  variationSelect(event): void {
    if (event) {
      this.variationForm.get(event?.name).setValue(event?.option);
    }
    this.allVariationsComplete();
  }

  allVariationsComplete(): void {
    if (this.variationForm.valid) {
      let variationProduct = this.product?.variations?.find((v) => {
        return this.findAllVariations(v?.variations);
      });
      if (variationProduct) {
        this.renderGallery = false;
        this.product._id = variationProduct._id;
        this.product.name = variationProduct.name;
        this.product.images_link = variationProduct.images_link;
        this.product.detail_list = this.product?.supplier_delivery
          ?.delivery_postventa
          ? [
              ...variationProduct.detail_list,
              {
                title: 'Delivery y Postventa',
                description: this.product?.supplier_delivery
                  ?.delivery_postventa,
              },
            ]
          : [...variationProduct.detail_list];
        this.product.type_variation = variationProduct.type_variation;
        this.product.price = variationProduct.price;
        this.product.special_price = variationProduct.special_price;
        this.product.stock = variationProduct.stock;
        this.product.warranty = variationProduct.warranty;
        this.product.installation = variationProduct.installation;
        this.hasVariation = true;
        this.correctVariation = true;
        this.incorrectVariation = false;
        this.setBaseProductInfo();
        setTimeout(() => {
          this.renderGallery = true;
        }, 0);
      } else {
        this.correctVariation = false;
        this.incorrectVariation = true;
        this.toastrService.warning(
          Messages.noCorrectVariation,
          Messages.warningTitle
        );
        //MESSAGE USER NO PRODUCT
      }
    }
  }

  findAllVariations(variations: Array<any>): boolean {
    if (variations) {
      let checker = new Array<boolean>(variations?.length).fill(false);
      variations?.forEach((e, i) => {
        if (
          this.variationForm.get(e?.variation_name).value === e?.value?.value
        ) {
          checker[i] = true;
        }
      });
      return checker.every((e) => {
        return e;
      });
    }

    return false;
  }

  additionalOption(event: any): void {
    switch (event.type) {
      case 'warranty':
        this.activeWarranty = event.active;
        break;
      case 'installation':
        this.activeInstallation = event.active;
        break;
      default:
        this.activeWarranty = false;
        this.activeInstallation = false;
        break;
    }
  }

  goBack() {
    this.router.navigateByUrl(this.previousUrl);
  }

  // Wrappers as ViewChild isn't allowing access to the directive from the template
  productsFeatNext() {
    this.productsFeatSwiper.nextSlide();
  }
  productsFeatPrev() {
    this.productsFeatSwiper.prevSlide();
  }
}

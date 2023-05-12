import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Inject,
  Output,
  EventEmitter,
  PLATFORM_ID,
} from '@angular/core';
import { Constants } from 'src/app/constants';
import { CategoryService } from 'src/app/services/category.service';
import { IProductBackend } from 'src/app/services/product.service';
import { ProductItemType } from '../../models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/internal/header.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LOGIN_TOKEN } from 'src/app/modals/login/login';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { Router } from '@angular/router';
import { GtagService } from 'src/app/gtag/gtag.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProductBackend;
  @Input() type: ProductItemType = 'scotia';
  @Input() filter: any;
  @Input() sort: any;
  @Input() search: any;
  @Output() checkOut = new EventEmitter<any>();
  loading: boolean = false;

  modalRef: MDBModalRef;
  public shortName: string;
  pointsDivider = Constants.POINTS_DIVIDER;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public catService: CategoryService,
    private cartService: CartService,
    private headerInternalService: HeaderService,
    private modalService: MDBModalService,
    private toastrService: ToastrService,
    private router: Router,
    private gtag: GtagService
  ) {}

  ngOnInit(): void {
    this.shortName = this.shortStringWithPoints(this.product.name);
  }

  get hasVariations() {
    return this.product?.type_variation === 'B';
  }

  addToCart(): void {
    this.checkOut.emit(false);
    if (this.product.stock > 0) {
      var cartProduct = {
        id_product: this.product._id,
        product: this.product,
        quantity: 1,
        warranty: false,
        installation: false,
      };
      if (isPlatformBrowser(this.platformId) && localStorage.getItem('jwt')) {
        this.loading = true;
        this.cartService.createCartItem(cartProduct).subscribe(
          (result) => {
            this.toastrService.success(Messages.successAddCart2, null, {
              timeOut: 7000,
            });

            this.toastrService.success(
              Messages.successAddCart,
              Messages.successTitle
            );

            this.gtag.addToCart({
              currency: 'PEN',
              items: [
                {
                  id: this.product.SKU,
                  name: this.product.name,
                  brand: this.product.brand?.name,
                  category: this.product?.categories[0]?.name,
                  quantity: 1,
                  price: this.product.special_price,
                  list_name: 'Product Detail',
                  list_position: 1,
                },
              ],
            });
            this.headerInternalService.emitData({ type: 'UPDATE_CART' });
            this.product.stock--;
            this.loading = false;
          },
          (error) => {
            this.product.stock--;
            this.loading = false;
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
    } else {
      this.toastrService.warning(
        Messages.noStockProduct,
        Messages.warningTitle
      );
      this.loading = false;
    }
  }

  private shortStringWithPoints(value: string = ''): string {
    const maxLength = 30;
    if (value.length <= maxLength) {
      return value;
    }
    return `${value.substr(0, maxLength)} ...`;
  }
}

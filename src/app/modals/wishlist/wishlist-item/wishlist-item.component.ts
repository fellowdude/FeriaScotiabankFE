import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IWishlistItem } from 'src/app/models/wishlist.model';
import { CartService } from 'src/app/services/cart.service';
import { HeaderService } from 'src/app/services/internal/header.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Constants } from 'src/app/constants';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/messages';
import { GtagService } from 'src/app/gtag/gtag.service';
@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss'],
})
export class WishlistItemComponent implements OnInit {
  @Input() url: string;
  @Input() wishlistItem: IWishlistItem;
  @Output() onClick = new EventEmitter<any>();
  pointsDivider: number = Constants.POINTS_DIVIDER;
  loading: boolean = false;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private headerInternalService: HeaderService,
    private toastrService: ToastrService,
    private gtag: GtagService
  ) {}

  ngOnInit(): void {
    console.log(this.wishlistItem);
  }

  deleteFromWishlist(): void {
    this.loading = true;
    this.wishlistService.removeFromWishlist(this.wishlistItem._id).subscribe(
      (result: any) => {
        this.loading = false;
        this.onClick.emit({ type: 'done' });
        this.headerInternalService.emitData({ type: 'UPDATE_WISHLIST' });
        this.toastrService.success(
          Messages.successDeleteWishlist,
          Messages.successTitle
        );
        this.gtag.removeFromWishlist({
          currency: 'PEN',
          items: [
            {
              id: this.wishlistItem.SKU,
              name: this.wishlistItem.name,
              brand: this.wishlistItem.brand?.name,
              category: this.wishlistItem?.categories[0],
              price: this.wishlistItem.price,
              list_name: 'Wishlist',
            },
          ],
        });
      },
      (err: any) => {
        this.toastrService.error(
          Messages.errorDeleteWishlist,
          Messages.errorTitle
        );
      }
    );
  }

  addToCart(): void {
    if (this.wishlistItem.stock > 0) {
      this.loading = true;
      var cartProduct = {
        id_product: this.wishlistItem._id,
        product: this.wishlistItem,
        quantity: 1,
      };
      this.cartService.createCartItem(cartProduct).subscribe((result: any) => {
        this.wishlistService
          .removeFromWishlist(this.wishlistItem._id)
          .subscribe((result: any) => {
            this.loading = false;
            this.headerInternalService.emitData({ type: 'UPDATE_CART' });
            this.headerInternalService.emitData({ type: 'UPDATE_WISHLIST' });
            this.onClick.emit({ type: 'done' });
            this.toastrService.success(
              Messages.successAddCart,
              Messages.successTitle
            );

            //GTAG addToCart
            this.gtag.addToCart({
              currency: 'PEN',
              items: [
                {
                  id: this.wishlistItem.SKU,
                  name: this.wishlistItem.name,
                  brand: this.wishlistItem.brand?.name,
                  category: 'Wishlist' + this.wishlistItem?.categories[0],
                  quantity: 1,
                  price: this.wishlistItem?.special_price,
                  list_name: 'Wishlist',
                  list_position: 1,
                },
              ],
            });
          });
      });
    } else {
      this.onClick.emit({ type: 'done' });
      this.toastrService.warning(
        Messages.noStockProduct,
        Messages.warningTitle
      );
    }
  }
}

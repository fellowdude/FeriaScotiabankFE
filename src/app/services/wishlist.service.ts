import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWishlistItem } from '../models/wishlist.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private api: ApiService) { }

  getWishlist(): Observable<IWishlistBackend> {
    return this.api.getLogged(`user/list-wishlist`);
  }

  addToWishlist( productId: string ): Observable<any>{
    return this.api.postLogged(`user/add-product-wishlist`, { productId: productId });
  }

  removeFromWishlist( productId: string ): Observable<any>{
    return this.api.deleteLogged(`user/remove-product-wishlist/${productId}`);
  }

  getTotalWishlist(): Observable<any>{
    return this.api.getLogged(`user/count-wishlist`);
  }
}

export interface IWishlistBackend{
  url_attachment: string;
  wishlist: Array<IWishlistItem>;
  _id: string;
}

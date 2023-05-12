import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { IWishlistItem } from 'src/app/models/wishlist.model';
// import { wishlist } from 'src/app/mockups/wishlist.mockup'
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: Array<IWishlistItem> = [];
  loading: boolean = false;
  url_attachment: string;

  constructor(public modalRef: MDBModalRef, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.initializeWishlist();
  }

  initializeWishlist(): void {
    this.loading = true;
    this.wishlistService.getWishlist().subscribe((result)=>{
      this.url_attachment = result.url_attachment;
      this.wishlist = result.wishlist;
      this.loading = false;
    })
  }

  actionItem( event: any ): void{
    if(event.type === 'loading'){
      this.loading = true;
    }
    if(event.type === 'done'){
      this.initializeWishlist();
    }
  }

  closeModal(): void {
    this.modalRef && this.modalRef.hide();
  }

}

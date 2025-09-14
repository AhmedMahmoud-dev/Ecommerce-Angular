import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/services/wishlist/wish-list-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() productData: any;

  private readonly cart = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly wishlist = inject(WishListService);

  subLoadingID: string | null = null;

  addToCart(ID: string) {
    this.subLoadingID = ID;
    this.cart.addProduct(ID).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.subLoadingID = null;
          this.toastr.success(response.message, response.status);
        }
      },
      error: (error) => {
        this.subLoadingID = null;
        this.toastr.error(error.error.message, error.error.statusMsg)
      }
    })
  }

  // toggleWishList(ID: string) {
  //   if (this.isInWishlist(ID)) {
  //     this.wishlist.removeProduct(ID).subscribe({
  //       next: (response) => {
  //         console.log('Remove', response);
  //         this.toastr.success(response.message, response.status);
  //       },
  //       error: (error) => {
  //         this.toastr.error(error.error.message, error.error.statusMsg);
  //       }
  //     })
  //   } else {
  //     this.wishlist.addProduct(ID).subscribe({
  //       next: (response) => {
  //         this.toastr.success(response.message, response.status);
  //         console.log('ADD', response);
  //       },
  //       error: (error) => {
  //         this.toastr.error(error.error.message, error.error.statusMsg);
  //       }
  //     })
  //   }
  // }


  toggleWishList(ID: string) {
    const action = this.wishlist.isInWishlist(ID) ?
      this.wishlist.removeProduct(ID) :
      this.wishlist.addProduct(ID);
    this.subLoadingID = ID;

    action.subscribe({
      next: (response) => {
        console.log('wishlist updated', response);
        this.toastr.success(response.message, response.status);
        this.subLoadingID = null;
      },
      error: (error) => {
        this.toastr.error(error.error.message, error.error.statusMsg);
        this.subLoadingID = null;
      }
    })
  }

  isInWishlist(ID: string): boolean {
    return this.wishlist.isInWishlist(ID);
  }
}
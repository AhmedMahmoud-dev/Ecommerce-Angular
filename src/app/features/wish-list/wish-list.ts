import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishListService } from '../../core/services/wishlist/wish-list-service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Loader } from '../../shared/components/loader/loader';
import { CartService } from '../../core/services/cart/cart-service';
import { EmptyCart } from '../../shared/components/empty-cart/empty-cart';

@Component({
  selector: 'app-wish-list',
  imports: [RouterLink, Loader, EmptyCart],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css'
})
export class WishList implements OnInit {
  private readonly wishList = inject(WishListService);
  private readonly toastr = inject(ToastrService);
  private readonly cart = inject(CartService);
  dataList: WritableSignal<any> = signal(null);
  count: number = 0;
  loading: boolean = true;

  getWishList() {
    this.loading = true;
    this.wishList.getWishList().subscribe({
      next: (response) => {
        if (response.status == "success") {
          this.count = response.count;
          this.dataList.set(response.data);
          console.log(this.count);
        }
      },
      error: (error) => {
        this.toastr.error('SomeThing Went Wrong', 'Fail');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }


  addToCart(ID: string) {
    this.removeProduct(ID);
    this.cart.addProduct(ID).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.toastr.success(response.message, response.status);
        }
      },
      error: (error) => {
        this.toastr.error(error.error.message, error.error.statusMsg)
      }
    })
  }


  removeProduct(ID: string) {
    this.loading = true;
    this.wishList.removeProduct(ID).subscribe({
      next: (response) => {
        if (response.status == "success") {
          this.getWishList();
          this.toastr.success(response.message, response.status);
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.message, error.status);
      }
    })
  }

  ngOnInit(): void {
    this.getWishList();
  }
}

import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products/product-service';
import { Loader } from "../../shared/components/loader/loader";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishlist/wish-list-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  imports: [Loader, CarouselModule, CommonModule],
  templateUrl: './productdetails.html',
  styleUrl: './productdetails.css'
})
export class Productdetails {
  private readonly active = inject(ActivatedRoute);
  private readonly productDetails = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly wishList = inject(WishListService);
  private readonly toastr = inject(ToastrService);


  loading = true;
  id!: string | null;
  detailsData: WritableSignal<any> = signal(null);
  subLoadingID: string | null = null;

  getProductId() {
    this.active.paramMap.subscribe({
      next: (paramURL) => {
        // console.log(paramURL.get('id'));
        this.id = paramURL.get('id');
      }
    })
  }

  ngOnInit(): void {
    this.getProductId();
    this.getDetails();
  }

  getDetails() {
    this.productDetails.getProductDetails(this.id).subscribe({
      next: (response) => {
        // console.log(response);
        this.detailsData.set(response.data);
        // console.log(this.detailsData());
      },
      error: (error) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  get descriptionLines() {
    return this.detailsData()?.description
      ?.split('\n')
      .filter((l: string) => l.trim() !== '') ?? [];
  }


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

  // addToWishList(ID: string) {
  //   this.wishList.addProduct(ID).subscribe({
  //     next: (response) => {
  //       if (response.status == 'success') {
  //         this.toastr.success(response.message, response.status);
  //       }
  //     },
  //     error: (error) => {
  //       this.toastr.error(error.error.message, error.error.statusMsg);
  //     }
  //   })
  // }

  toggleWishlist(ID: string) {
    this.subLoadingID = ID;
    const action = this.isInWishlist(ID) ? this.wishList.removeProduct(ID) : this.wishList.addProduct(ID);
    action.subscribe({
      next: (response) => {
        this.subLoadingID = null;
        this.toastr.success(response.message, response.status);
      },
      error: (error) => {
        this.toastr.error(error.error.message, error.error.statusMsg);
        this.subLoadingID = null;
      }
    })
  }

  isInWishlist(ID: string): boolean {
    return this.wishList.isInWishlist(ID);
  }
}
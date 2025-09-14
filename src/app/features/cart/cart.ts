import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart-service';
import { CartInterface } from '../../core/interfaces/cart/cart-interface';
import { Loader } from '../../shared/components/loader/loader';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { EmptyCart } from '../../shared/components/empty-cart/empty-cart';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [Loader, MatButtonModule, MatDialogModule, ConfirmDialog, EmptyCart, RouterLink, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  private readonly cart = inject(CartService);
  private readonly toastr = inject(ToastrService);
  productList: WritableSignal<CartInterface[]> = signal([]);
  private readonly dialog = inject(MatDialog);
  cartID!: string;
  totalPrice!: number;
  numOfCartItems!: number;

  loading: boolean = true;
  subLoading: boolean = false;
  subLoadingID: string | null = null;

  getCart(loading: boolean, onFinish?: () => void) {
    this.loading = loading;
    this.cart.getCart().subscribe({
      next: (response) => {
        this.productList.set(response.data.products)
        this.totalPrice = response.data.totalCartPrice;
        this.cartID = response.cartId;
        this.numOfCartItems = response.numOfCartItems;
      },
      error: (error) => {
        this.loading = false;
        if (onFinish) onFinish();
      },
      complete: () => {
        this.loading = false;
        if (onFinish) onFinish();
      }
    })
  }


  deleteProduct(ID: string) {
    // this.loading = true;
    this.subLoading = true;
    this.subLoadingID = ID;
    this.cart.deleteProduct(ID).subscribe({
      next: (response) => {
        this.getCart(false, () => {
          this.subLoadingID = null;
          this.toastr.success('Product Removed Successfully', 'Success');
        });
      },
      error: (error) => {
        // this.loading = false;
        this.subLoading = false;
        // this.subLoadingID = null;
        this.getCart(false, () => {
          this.subLoadingID = null;
          this.toastr.error('Something Went Wrong', 'Fail');
        });
      },
      complete: () => {
        // this.loading = false;
        // this.subLoading = false;
      }
    })
  }


  updateCart(count: number, ID: string) {
    // this.loading = true;
    this.subLoading = true;
    this.subLoadingID = ID;
    this.cart.updateCart(count, ID).subscribe({
      next: (response) => {
        this.getCart(false);
        // this.subLoadingID = null;
        this.getCart(false, () => {
          this.subLoadingID = null;
          this.toastr.success('Product Updated Successfully', 'Success');
        });
      },
      error: (error) => {
        console.log(error);
        // this.loading = false;
        this.subLoading = false;
        // this.subLoadingID = null;
        this.getCart(false, () => {
          this.subLoadingID = null;
          this.toastr.error('Something Went Wrong', 'Fail');
        });
      },
      complete: () => {
        // this.loading = false;
        this.subLoading = false;
      }
    })
  }


  clearCart() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { message: 'Are you sure you want to clear your cart? This action cannot be undone.' }
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.loading = true;
        this.cart.clearCart().subscribe({
          next: () => {
            this.getCart(true, () => {
              this.toastr.success('Cart Cleared Successfully', 'Success');
            });
            this.numOfCartItems = 0;
          },
          error: () => {
            this.toastr.error('Something Went Wrong', 'Fail');
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.getCart(true);
  }
}
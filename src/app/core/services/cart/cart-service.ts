import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { WishListService } from '../wishlist/wish-list-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly cookies = inject(CookieService);
  private readonly wishlist = inject(WishListService);


  // addProduct(productID: string): Observable<any> {
  //   return this.http.post(`${environment.baseURL}cart`, {
  //     productId: productID
  //   }, {
  //     headers: { token: `${this.cookies.get('token')}` }
  //   }).pipe(
  //     tap({

  //     }
  //     )
  //   )
  // }


  addProduct(productID: string): Observable<any> {
    if (this.wishlist.isInWishlist(productID)) {
      return this.wishlist.removeProduct(productID).pipe(
        switchMap(() =>
          this.http.post(`${environment.baseURL}cart`, {
            productId: productID
          }, {
            headers: { token: `${this.cookies.get('token')}` }
          })
        )
      )
    }
    return this.http.post(`${environment.baseURL}cart`, {
      productId: productID
    }, {
      headers: { token: `${this.cookies.get('token')}` }
    })
  }


  getCart(): Observable<any> {
    return this.http.get(`${environment.baseURL}cart`, {
      headers: { token: `${this.cookies.get('token')}` }
    })
  }


  updateCart(count: number, productID: string): Observable<any> {
    return this.http.put(`${environment.baseURL}cart/${productID}`, {
      count: count
    }, {
      headers: { token: `${this.cookies.get('token')}` }
    })
  }


  deleteProduct(productID: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}cart/${productID}`, {
      headers: { token: `${this.cookies.get('token')}` }
    })
  }


  clearCart(): Observable<any> {
    return this.http.delete(`${environment.baseURL}cart`, {
      headers: { token: `${this.cookies.get('token')}` }
    })
  }
}
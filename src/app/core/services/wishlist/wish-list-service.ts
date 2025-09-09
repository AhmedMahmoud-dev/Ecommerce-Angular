import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Pipe } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private readonly http = inject(HttpClient);
  private readonly cookies = inject(CookieService);
  private readonly toastr = inject(ToastrService);
  private wishlistIDs: string[] = [];

  constructor() {
    const storedIDs = this.cookies.get('wislistIDs');
    this.wishlistIDs = storedIDs ? JSON.parse(storedIDs) : [];
    this.syncWishlist();
  }

  getWishList(): Observable<any> {
    return this.http.get(`${environment.baseURL}wishlist`, {
      headers: { token: `${this.cookies.get('token')}` }
    })
  }


  private syncWishlist(): void {
    this.getWishList().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          const serverIDs = response.data.map((item: any) => item._id) || [];
          const merged = Array.from(new Set([...this.wishlistIDs, ...serverIDs]));
          this.wishlistIDs = merged;
          this.cookies.set('wishlistIDs', JSON.stringify(this.wishlistIDs));
        }
      },
      error: (error) => {
      }
    })
  }


  addProduct(productID: string): Observable<any> {
    return this.http.post(`${environment.baseURL}wishlist`, {
      productId: productID
    }, {
      headers: { token: `${this.cookies.get('token')}` }
    }).pipe(
      tap(response => {
        if (!this.wishlistIDs.includes(productID)) {
          this.wishlistIDs.push(productID);
        }
        console.log(this.wishlistIDs || 'empty IDs');
        this.cookies.set('wislistIDs', JSON.stringify(this.wishlistIDs));
      })
    )
  }


  removeProduct(productID: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}wishlist/${productID}`, {
      headers: { token: `${this.cookies.get('token')}` }
    }).pipe(
      tap(reponse => {
        this.wishlistIDs = this.wishlistIDs.filter(id => id !== productID);
        console.log('new Wishlist after remove', this.wishlistIDs);
        this.cookies.set('wislistIDs', JSON.stringify(this.wishlistIDs));
      })
    )
  }

  isInWishlist(ID: string): boolean {
    return this.wishlistIDs.includes(ID);
  }
}
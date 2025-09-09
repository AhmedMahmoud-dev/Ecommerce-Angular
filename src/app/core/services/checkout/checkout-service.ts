import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly http = inject(HttpClient);
  private readonly cookies = inject(CookieService);

  checkoutSession(shippingAddress: any, cartID: string | null): Observable<any> {
    return this.http.post(`${environment.baseURL}orders/checkout-session/${cartID}?url=http://localhost:4200`, {
      shippingAddress: shippingAddress,
    }, {
      headers: { token: this.cookies.get('token') }
    }
    )
  }

  // Cash On Delevery
  COD(shippingAddress: any, cartID: string): Observable<any> {
    return this.http.post(`${environment.baseURL}orders/${cartID}`, {
      shippingAddress: shippingAddress,
    }, {
      headers: { token: this.cookies.get('token') }
    }
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { LoginInterface } from '../../../interfaces/auth/login-interface';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {
    if (this.cookieService.get('token')) {
      this.decodedUserData();
    }
  }

  userData: BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);
  private http = inject(HttpClient);
  private router = inject(Router);
  private cookieService = inject(CookieService);

  loginData(data: LoginInterface): Observable<any> {
    return this.http.post(`${environment.baseURL}auth/signin`, data);
  }

  decodedUserData() {
    // const token = localStorage.getItem('token')!;
    const token = this.cookieService.get('token');
    const decode = jwtDecode(token);
    // console.log(decode);
    this.userData.next(decode);
  }

  logOut() {
    this.cookieService.delete('token');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }
}
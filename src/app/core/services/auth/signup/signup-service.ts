import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { SignupInterface } from '../../../interfaces/auth/signup-interface';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private http = inject(HttpClient);
  signupData(data: SignupInterface): Observable<any> {
    return this.http.post(`${environment.baseURL}auth/signup`, data);
  }
}

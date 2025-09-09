import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ForgotPasswordInterface, ResetPasswordInterface, VerifyResetCodeInterface } from '../../../interfaces/auth/reset-password-interface';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private http = inject(HttpClient);

  private formLogin = false;

  // setFormLogin(value: boolean) {
  //   this.formLogin = value;
  // }

  // canAccessResetPassword(): boolean {
  //   return this.formLogin;
  // }

  // clear() {
  //   this.formLogin = false;
  // }


  forgetPassword(payload: ForgotPasswordInterface): Observable<any> {
    return this.http.post(`${environment.baseURL}auth/forgotPasswords`, payload)
  }


  resetCode(payload: VerifyResetCodeInterface): Observable<any> {
    return this.http.post(`${environment.baseURL}auth/verifyResetCode`, payload)
  }


  newPassword(payload: ResetPasswordInterface): Observable<any> {
    return this.http.put(`${environment.baseURL}auth/resetPassword`, payload)
  }
}

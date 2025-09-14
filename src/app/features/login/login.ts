import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/services/auth/login/login-service';
import { LoginInterface } from '../../core/interfaces/auth/login-interface';
import { CookieService } from 'ngx-cookie-service';
import { ResetPasswordService } from '../../core/services/auth/resetPassword/reset-password-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loading: boolean = false;

  private router = inject(Router);
  private login = inject(LoginService);
  private cookieService = inject(CookieService);
  private resetPassword = inject(ResetPasswordService);

  successfullyRegister: boolean = false;
  RegisterError: boolean = false;
  errorMessage!: string;

  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl(null, [
      Validators.required,
    ]),
  });


  submit() {
    if (this.loginForm.valid) {
      this.loading = true;
      // API
      this.login.loginData(this.loginForm.value as LoginInterface).subscribe({
        next: response => {
          if (response.message === 'success') {
            this.successfullyRegister = true;
            this.cookieService.set('token', response.token);
            this.login.decodedUserData();
            this.router.navigate(['/home']);
          }
        },
        error: error => {
          this.errorMessage = error.error.message;
          this.RegisterError = true;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToReset() {
    // this.resetPassword.setFormLogin(true);
    this.router.navigate(['/reset-password/email-form']);
  }
}

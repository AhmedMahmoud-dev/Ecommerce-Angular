import { Component, inject } from '@angular/core';
import { ResetPasswordService } from '../../core/services/auth/resetPassword/reset-password-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordInterface, ResetPasswordInterface, VerifyResetCodeInterface } from '../../core/interfaces/auth/reset-password-interface';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  private readonly resetPassword = inject(ResetPasswordService);
  private readonly router = inject(Router);

  loading: boolean = false;

  forgetPasswordMsg!: string;
  forgetPasswordMsgError!: boolean;

  resetCodeMsg!: string;
  resetCodeMsgError!: boolean;

  newPasswordMsg!: string;
  newPasswordMsgError!: boolean;

  errorMsg!: string | null;



  forgetPassword = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  })

  verifyResetCode = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{6}$/)
    ])
  })

  newPassword = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
    ])
  })




  submitForgetPassword() {
    this.loading = true;
    this.errorMsg = null;
    this.resetPassword.forgetPassword(this.forgetPassword.value as ForgotPasswordInterface).subscribe({
      next: (response) => {
        this.forgetPasswordMsg = response.message;
        if (response.statusMsg === 'success') {
          this.forgetPasswordMsgError = false;
          this.router.navigate(['reset-password/code-form']);
        }
        if (response.statusMsg === 'fail') {
          this.forgetPasswordMsgError = true;
        }
      },
      error: (error) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }



  submitVerifyResetCode() {
    this.loading = true;
    this.errorMsg = null;
    this.resetPassword.resetCode(this.verifyResetCode.value as VerifyResetCodeInterface).subscribe({
      next: (response) => {
        this.resetCodeMsg = response.message;
        if (response.status === 'Success') {
          this.resetCodeMsgError = false;
          this.router.navigate(['reset-password/new-password-form']);
        }
        if (response.status === 'fail') {
          this.resetCodeMsgError = true;
        }
      },
      error: (error) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }



  submitNewPassword() {
    this.loading = true;
    this.errorMsg = null;
    this.resetPassword.newPassword(this.newPassword.value as ResetPasswordInterface).subscribe({
      next: (response) => {
        this.newPasswordMsg = response.message;
        if (response.token) {
          this.newPasswordMsgError = false;
          this.router.navigate(['/login']);
        }
        if (response.statusMsg === 'fail') {
          this.newPasswordMsgError = true;
        }
      },
      error: (error) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}

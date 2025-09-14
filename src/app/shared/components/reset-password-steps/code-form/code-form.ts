import { Component, inject } from '@angular/core';
import { ResetPassword } from '../../../../features/reset-password/reset-password';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordService } from '../../../../core/services/auth/resetPassword/reset-password-service';

@Component({
  selector: 'app-code-form',
  imports: [ReactiveFormsModule],
  templateUrl: './code-form.html',
  styleUrl: './code-form.css'
})
export class CodeForm {
  resetPassword = inject(ResetPassword);
  resetPasswordService = inject(ResetPasswordService);

  // goToNewPasswordForm() {
  //   this.resetPasswordService.setFormLogin(true);
  // }
}

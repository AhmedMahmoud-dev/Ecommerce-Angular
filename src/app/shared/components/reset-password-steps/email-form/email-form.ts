import { ResetPasswordService } from './../../../../core/services/auth/resetPassword/reset-password-service';
import { ResetPassword } from './../../../../features/reset-password/reset-password';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  imports: [ReactiveFormsModule],
  templateUrl: './email-form.html',
  styleUrl: './email-form.css'
})
export class EmailForm {
  resetPassword = inject(ResetPassword);
  resetPasswordService = inject(ResetPasswordService);

  // goToCodeForm() {
  //   this.resetPasswordService.setFormLogin(true);
  // }
}

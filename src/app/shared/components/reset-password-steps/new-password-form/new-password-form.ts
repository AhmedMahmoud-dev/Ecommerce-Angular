import { Component, inject } from '@angular/core';
import { ResetPassword } from '../../../../features/reset-password/reset-password';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-password-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-password-form.html',
  styleUrl: './new-password-form.css'
})
export class NewPasswordForm {
  resetPassword = inject(ResetPassword);
}

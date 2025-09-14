import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { SignupService } from '../../core/services/auth/signup/signup-service';
import { SignupInterface } from '../../core/interfaces/auth/signup-interface';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})


export class Signup {
  loading: boolean = false;
  private router = inject(Router);
  private signup = inject(SignupService);
  successfullyRegister: boolean = false;
  RegisterError: boolean = false;
  errorMessage!: string;
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { passwordMismatch: true };
  }

  signUpForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z ]+$/),
    ]),

    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
    ]),

    rePassword: new FormControl(null, [
      Validators.required,
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0-2,5]\d{8}$/),
    ]),
  }, { validators: this.passwordValidator });


  submit() {
    if (this.signUpForm.valid) {
      // console.log(this.signUpForm);
      this.loading = true;
      // API
      this.signup.signupData(this.signUpForm.value as SignupInterface).subscribe({
        next: response => {
          // console.log('Response===============================',response);
          if (response.message === 'success') {
            // this.signUpForm.reset();
            this.successfullyRegister = true;
            this.router.navigate(['/login']);
          }
        },
        error: error => {
          // console.log('Error XXXXXXXXXXXXXXXXXXXXXXXXXXX',error);
          this.errorMessage = error.error.message;
          this.RegisterError = true;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
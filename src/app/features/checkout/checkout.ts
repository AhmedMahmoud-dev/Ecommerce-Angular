import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CheckoutService } from '../../core/services/checkout/checkout-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  private readonly checkout = inject(CheckoutService);
  private readonly cookies = inject(CookieService);
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute);
  cartID!: string | null;
  loading = false;
  errorMsg!: string;

  checkoutform = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0-2,5]\d{8}$/)
    ]),
    city: new FormControl(null, Validators.required)
  })

  submit() {
    if (this.checkoutform.valid) {
      this.loading = true;
      this.checkout.checkoutSession(this.checkoutform.value, this.cartID).subscribe({
        next: (response) => {
          if (response.status == "success") {
            console.log('response', response);
            window.location.href = response.session.url;
            // window.open(response.session.url, '_blank');
          }
        },
        error: (error) => {
          console.log('error', error)
          this.errorMsg = error.error.message;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.checkoutform.markAllAsTouched();
    }
  }

  getID() {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.cartID = response.get('cartID');
      }
    })
  }

  ngOnInit(): void {
    this.getID();
  }
}
import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Products } from './features/products/products';
import { Categories } from './features/categories/categories';
import { Brands } from './features/brands/brands';
import { Login } from './features/login/login';
import { Signup } from './features/signup/signup';
import { Productdetails } from './features/productdetails/productdetails';
import { Notfound } from './features/notfound/notfound';
import { Cart } from './features/cart/cart';
import { authGuard } from './core/guard/auth-guard';
import { guestGuard } from './core/guard/guest-guard';
import { ResetPassword } from './features/reset-password/reset-password';
import { CodeForm } from './shared/components/reset-password-steps/code-form/code-form';
import { EmailForm } from './shared/components/reset-password-steps/email-form/email-form';
import { NewPasswordForm } from './shared/components/reset-password-steps/new-password-form/new-password-form';
import { WishList } from './features/wish-list/wish-list';
import { Checkout } from './features/checkout/checkout';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Home' },
  { path: 'products/:page', component: Products, title: 'Products' },
  { path: 'products', redirectTo: 'products/1', pathMatch: 'full' },
  { path: 'productdetails/:id', component: Productdetails, title: 'ProductDetails' },
  { path: 'categories', component: Categories, title: 'Categories' },
  { path: 'brands/:page', component: Brands, title: 'Brands' },
  { path: 'brands', redirectTo: 'brands/1', pathMatch: 'full' },
  { path: 'wish-list', component: WishList, title: 'Wish List', canActivate: [authGuard] },
  { path: 'cart', component: Cart, title: 'Cart', canActivate: [authGuard] },
  { path: 'login', component: Login, title: 'Login', canActivate: [guestGuard] },
  { path: 'signup', component: Signup, title: 'Signup', canActivate: [guestGuard] },
  { path: 'checkout/:cartID', component: Checkout, title: 'Checkout', canActivate: [authGuard] },
  {
    path: 'reset-password', component: ResetPassword, title: 'Reset Password', children: [
      { path: 'code-form', component: CodeForm, title: 'Request Code' },
      { path: 'email-form', component: EmailForm, title: 'Email Form' },
      { path: 'new-password-form', component: NewPasswordForm, title: 'New Password' },
    ]
  },
  { path: '**', component: Notfound, title: 'Page Notfound' },
];

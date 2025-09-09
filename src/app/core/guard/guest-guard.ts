import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/auth/login/login-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(LoginService);
  const router = inject(Router);
  if (auth.userData.getValue() !== null) {
    return router.parseUrl('/home');
  }
  else {
    return true;
  }
};
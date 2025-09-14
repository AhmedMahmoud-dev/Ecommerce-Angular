import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login/login-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(LoginService);
  if (auth.userData.getValue() !== null) {
    return true;
  }
  else {
    return router.parseUrl('/login');
  }
};
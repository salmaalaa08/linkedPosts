import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router)
  if(auth.userData.getValue()!==null){
    return true;
  } else {
    return router.parseUrl('/signin');
  }
};

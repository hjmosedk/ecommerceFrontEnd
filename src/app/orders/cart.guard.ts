import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { map } from 'rxjs';

export const cartGuard = () => {
  const router = inject(Router);
  const cartService = inject(CartService);
  return cartService.cartLength().pipe(
    map((length) => {
      if (length === 0) {
        return router.parseUrl('/');
      }
      return true;
    })
  );
};

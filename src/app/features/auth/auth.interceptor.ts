import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AuthService } from './services/auth.service';

export const AuthInterceptorService: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  console.log('interceptor');
  return authService.user$.pipe(
    take(1),
    exhaustMap((user: any) => {
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user?.accessToken),
      });
      return next(modifiedReq);
    })
  );
};

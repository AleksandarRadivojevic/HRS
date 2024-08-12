import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { HttpParams } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';
import { inject } from '@angular/core';

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

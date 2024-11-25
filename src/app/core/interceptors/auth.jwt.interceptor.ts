import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { LocalStorageService} from '../services/localStorage/localStorage.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../services/userService/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next:HttpHandlerFn) =>{
  const authService = inject(AuthService);
  const localStorage = inject(LocalStorageService)
  const router = inject(Router)
  const token: string | null = authService.getToken();

    if (!token) {
      return next(req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });



  return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401 || err.status === 403 || err.status === 403 && err.error.codeErrr === 'INSUFFICIENT_AUTHENTICATION' ){
             localStorage.destroyToken();
              router.navigate(['/login']);
          }
           return throwError(() => new Error(err.error.message || err.message));
        })

    );
}

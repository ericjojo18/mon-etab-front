import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { LocalStorageService} from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';


export class jwtInterceptors implements HttpInterceptor{
  constructor(private localStorage: LocalStorageService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.localStorage.getToken();

    let authReg : any
    if (token) {
      authReg = req.clone({
        setHeaders: { Authorizatin: 'Bearer' + token},
      });

    }

    return next.handle(authReg).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401 || err.status === 403 || err.status === 403 && err.error.codeErrr === 'INSUFFICIENT_AUTHENTICATION' ){
            this.localStorage.destroyToken();
          this.router.navigate(['/login']);
          }
           return throwError(() => new Error(err.error.message || err.message));
        })

    );

  }
}

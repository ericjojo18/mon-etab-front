import {Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGaurd implements CanActivate {

  constructor(private router: Router, private authService) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles = route.data['roles'];
    const token = localStorage.getItem('access_token');
    const userDetails = this.authService.getUserDetails();
    const role = userDetails?.role;

  }
}

import { Injectable} from '@angular/core';
import {environmentDev} from '../../../../environments/environment.dev';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {BaseService} from '../baseService/base.service';
import {LocalStorageService} from '../localStorage/localStorage.service';
import {UserInterface} from '../../../domains/interfaces/userInterface/user.interface';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class AuthService{
  private baseUrl: string = environmentDev.baseUrl;
  private tokenSubject = new BehaviorSubject<any>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private baseService: BaseService,
              private localStorageService: LocalStorageService,
              private router: Router
              ) {}

  login(credentials: { username: string; password: string}): Observable<UserInterface>{
    return this.baseService.post<UserInterface>('api/token/', credentials ).pipe(
      tap((response: any) =>{
        this.storedToken(response.access);
        localStorage.setItem('refresh_token',  response.refresh)
        const decode_token = this.localStorageService.decodeToken(response.access)
        this.baseService.getOne('api/users/', decode_token.user_id).subscribe(
          (data) => {
            console.log(data)
            localStorage.setItem('user_details', JSON.stringify(data));
            if(data.role==='student'){
              this.router.navigateByUrl('')
            } else if (data.role==='teacher'){
              this.router.navigateByUrl('')
            }
          }
        )
      }),
      catchError(error => {
        // Handle error appropriately
        return throwError(() => new Error(error.message));
      })
    );
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_details');
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.getToken();
    return this.tokenSubject.value !== null;
  }

  getUserDetails() {
    const userDetails = localStorage.getItem('user_details');
    return userDetails ? JSON.parse(userDetails): null;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Méthode pour rafraîchir les tokens. Utilisée par l'intercepteur HTTP
  refreshToken(): Observable<any>{
    const refresh = localStorage.getItem('refresh_token');
    return this.baseService.post('api/token/refresh/', {refresh}).pipe(
      tap((response: any) => {
        this.storedToken(response.access);
        const decode_token = this.localStorageService.decodeToken(response.access);
        this.baseService.getOne('api/users/', decode_token.user_id).subscribe(
          (data)=>{
            localStorage.setItem('user_details', JSON.stringify(data));
          }
        )
      }),
      catchError(() => {
        this.logout();
        return throwError(() => new Error('Failed to refresh token'));
      })
    );
  }

  // verify the token
  verifyToken(token: string): Observable<any>{
    return this.baseService.post('api/token/verify/', {token}).pipe(
      catchError(() => {
      return throwError(() => new Error('Token verification failed'));
    })
    );
  }

  private storedToken(token: string){
    localStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
  }
}

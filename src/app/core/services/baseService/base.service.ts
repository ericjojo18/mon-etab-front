import {inject, Injectable} from '@angular/core';
import { environmentDev} from '../../../../environments/environment.dev';
import {HttpClient, HttpHeaders,} from '@angular/common/http';
import {catchError, Observable, shareReplay, throwError} from 'rxjs';
import {LocalStorageService} from '../localStorage/localStorage.service';


@Injectable({
  providedIn: 'root'
})

export class BaseService {
  private baseUrl: string = environmentDev.baseUrl;
  constructor(private http: HttpClient,
              private localService: LocalStorageService
              ) {}

  private getHeaders(){
    //const localService: LocalStorageService = inject(LocalStorageService);
    const token: string | null = this.localService.getToken();
    return new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getOne<T>(endPoint: string, id: number): Observable<T> {
    const url: string = `${this.baseUrl}/${endPoint}/${id}`
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  //getAll(endPoint: string): Observable<any>{
    //const url: string = `${this.baseUrl}/${endPoint}`
    //return this.http.get(url).pipe(shareReplay(1), catchError(this.handleError));
  //}

  getAll<T>(endPoint: string): Observable<T>{
    const url: string = `${this.baseUrl}/${endPoint}`
    return this.http.get<T>(url).pipe(shareReplay(1), catchError(this.handleError));
  }

  post<T>(endPoint: string, data: any): Observable<T> {
    const url: string = `${this.baseUrl}/${endPoint}`;
    const headers: HttpHeaders = this.getHeaders()
    return this.http.post<T>(url, data).pipe(catchError(this.handleError));

  }

  edit<T>(endPoint: string, id:any, data:any): Observable<T>{
    const url: string = `${this.baseUrl}/${endPoint}/${id}/`;
    const headers: HttpHeaders = this.getHeaders()
    return this.http.put<T>(url, data).pipe(catchError(this.handleError));
  }
  delete(endPoint: string, id: number) {
      const url: string = `${this.baseUrl}/${endPoint}/${id}`;
      const headers: HttpHeaders = this.getHeaders();
      return this.http.delete(url, {headers}).pipe(catchError(this.handleError));
    }


  private handleError(error: any) {
    let errorMessage: string = 'Oups ! quelque chose a mal tourné.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      switch (error.status) {
        case 400: errorMessage = error.error.message;
        break;
        case 401: errorMessage = error.error.message;
        break;
        case 402: errorMessage = error.error.message;
        break;
        case 403: errorMessage = error.error.message;
        break;
        case 404: errorMessage = error.error.message;
        break;
        case 500: errorMessage = error.error.message;
        break;
        default: errorMessage = error.error.message;
        break;
      }
    }
    return throwError((): Error => new Error(errorMessage))
  }
}

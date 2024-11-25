import { Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  private accessToken = 'access_token';
  private refreshToken = 'refresh_token';
  private userDetails = 'user_details';
  private tokenSubject = new BehaviorSubject<any>(null);
  token$ = this.tokenSubject.asObservable();


  getToken() {
    try {
      return localStorage.getItem(this.accessToken);
    } catch (Error) {
      console.error('Error retrieving token in localStorage', Error);
    }

  }

  saveToken(token: string){
    try {
      localStorage.setItem(this.accessToken , JSON.stringify(token));
      this.tokenSubject.next(token)
    } catch (Error) {
      console.error('Error setting token in localStorage', Error);
    }

  }

  destroyToken(){
    try {
      localStorage.removeItem(this.accessToken);
    } catch (Error) {
      console.error('Error removing token from localStorage', Error);
    }

  }

  getRefresh(){
    return localStorage.getItem(this.refreshToken)
  }

  saveRefreshToken(token: string){
    localStorage.setItem(this.refreshToken, JSON.stringify(token));
  }

  destroyRefresh(){
    localStorage.removeItem(this.refreshToken);
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error jwt Decode from localStorage', Error);
      return  null

    }
  }

  getData() {
    try {
      return localStorage.getItem(this.userDetails);
    } catch (Error) {
      console.error('Error retrieving user data from localStorage', Error);
    }
  }

  saveData(data: any){
    try {
      localStorage.setItem(this.userDetails, JSON.stringify(data) )
    } catch (Error) {
      console.error('Error setting user data in localStorage', Error);
    }
  }

  destroyData(){
    try {
      localStorage.removeItem(this.userDetails)
    } catch (Error) {
      console.error('Error removing user data from localStorage', Error);
    }
  }

  get(key: string){
      return localStorage.getItem(key);
  }

  save(key: string, data: any){
    localStorage.setItem(key, JSON.stringify(data));
  }

  destroy(key: string) {
    localStorage.removeItem(key);
  }


}

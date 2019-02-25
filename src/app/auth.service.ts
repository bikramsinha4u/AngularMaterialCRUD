import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppAccount } from './models/app-account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  registerUser(registerData: any): boolean {
    let index = ACCOUNT_DATA.findIndex(x => x.Email == registerData.email);
    if (index != -1) {
      return false;
    }
    ACCOUNT_DATA.push({ Email: registerData.email, Password: registerData.pwd });
    localStorage.setItem('token', registerData.email);
    return true;
  }

  loginUser(loginData: any): boolean {
    let index = ACCOUNT_DATA.findIndex(x => (x.Email == loginData.email && x.Password == loginData.pwd));
    if (index != -1) {
      localStorage.setItem('token', loginData.email);
      return true;
    }
    return false;
  }

  ifTokenFound(): boolean {
    return localStorage.getItem('token') != null ? true : false;
  }
}

const ACCOUNT_DATA: AppAccount[] = [
  { Email: 'bikramsinha4u@yahoo.com', Password: '123' },
  { Email: 'nandini@yahoo.com', Password: '123' }
];
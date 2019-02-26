import { Injectable } from '@angular/core';
import { AccountData } from './models/account-data';
import { AccountDTO } from './models/accountDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  registerUser(registerData: AccountDTO): boolean {
    let index = ACCOUNT_DATA.findIndex(x => x.Email == registerData.Email);
    
    if (index != -1) 
      return false;    
        
    this.addAccount(registerData);
    return true;
  }

  loginUser(loginData: AccountDTO): boolean {    
    if (this.isAccountExist(loginData))
      return true;
    
    return false;
  }

  isAccountExist(accountDTO: AccountDTO): boolean{
    let index = ACCOUNT_DATA.findIndex(x => (x.Email == accountDTO.Email && x.Password == accountDTO.Password));
    return index != -1;
  }

  addAccount(accountDTO: AccountDTO): void{
    ACCOUNT_DATA.push({ Email: accountDTO.Email, Password: accountDTO.Password });
  }
}

const ACCOUNT_DATA: AccountData[] = [
  { Email: 'bikramsinha4u@yahoo.com', Password: '123' },
  { Email: 'nandini@arborgold.com', Password: '123' }
];
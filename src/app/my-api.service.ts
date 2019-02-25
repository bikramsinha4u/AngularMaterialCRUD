import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Users } from './models/users';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return USERS_DATA;
  }

  checkIfUserExist(email: string): boolean {
    return USERS_DATA.some(x => x.Email == email);
  }

  addUpdateUser(userData: Users) {
    debugger;
    if (this.checkIfUserExist(userData.Email)) {
      this.removeUser(userData.Email);
    }
    USERS_DATA.push(userData);
  }

  removeUser(userEmail: string) {
    let index: number = USERS_DATA.findIndex(x => x.Email == userEmail);
    if (index !== -1) {
      USERS_DATA.splice(index, 1);
    }
  }
}

const USERS_DATA: Users[] = [
  { FirstName: 'Bikram', LastName: 'Sinha', Phone: '8789630950', Email: 'bikramsinha4u@yahoo.com', Address: 'Bellandur', City: 'Bangalore', State: 'Karnataka', Zip: '560103', Notes: 'Dot Net & Angular developer' },
  { FirstName: 'Nandini', LastName: 'V', Phone: '9886324969', Email: 'nandini@gmail.com', Address: 'Kormangala', City: 'Bangalore', State: 'Karnataka', Zip: '560109', Notes: 'HR Manager' },
];
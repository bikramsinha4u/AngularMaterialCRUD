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
  { FirstName: 'Nandini', LastName: 'V', Phone: '7619678081', Email: 'nandini@gmail.com', Address: 'Kormangala', City: 'Bangalore', State: 'Karnataka', Zip: '560109', Notes: 'HR Manager' },
  { FirstName: 'Shiv', LastName: 'K', Phone: '7619678081', Email: 'shiv@arborgold.com', Address: 'Indiranagar', City: 'Bangalore', State: 'Karnataka', Zip: '560108', Notes: 'Software Eng 1' },
  { FirstName: 'Levi', LastName: 'K', Phone: '7619678081', Email: 'levi@arborgold.com', Address: 'Madiwal', City: 'Bangalore', State: 'Karnataka', Zip: '560107', Notes: 'Software Eng 2' },
  { FirstName: 'Ryan', LastName: 'K', Phone: '7619678081', Email: 'ryan@arborgold.com', Address: 'Marathalli', City: 'Bangalore', State: 'Karnataka', Zip: '560106', Notes: 'Software Eng 3' },
  { FirstName: 'Name 1', LastName: 'K', Phone: '7619678081', Email: 'name1@gmail.com', Address: 'HSR', City: 'Bangalore', State: 'Karnataka', Zip: '560105', Notes: 'Software Eng 4' },
  { FirstName: 'Name 2', LastName: 'K', Phone: '7619678082', Email: 'name2@gmail.com', Address: 'Sarjapur', City: 'Bangalore', State: 'Karnataka', Zip: '560104', Notes: 'Software Eng 5' },
  { FirstName: 'Name 3', LastName: 'K', Phone: '7619678083', Email: 'name3@gmail.com', Address: 'Domlur', City: 'Bangalore', State: 'Karnataka', Zip: '560102', Notes: 'Software Eng 6' },
  { FirstName: 'Name 4', LastName: 'K', Phone: '7619678084', Email: 'name4@gmail.com', Address: 'BTM', City: 'Bangalore', State: 'Karnataka', Zip: '560101', Notes: 'Software Eng 7' },
  { FirstName: 'Name 5', LastName: 'K', Phone: '7619678085', Email: 'name5@gmail.com', Address: 'JP Nagar', City: 'Bangalore', State: 'Karnataka', Zip: '560100', Notes: 'Software Eng 8' },
  { FirstName: 'Name 6', LastName: 'K', Phone: '7619678086', Email: 'name6@gmail.com', Address: 'Electronic City', City: 'Bangalore', State: 'Karnataka', Zip: '560111', Notes: 'Software Eng 9' },
];
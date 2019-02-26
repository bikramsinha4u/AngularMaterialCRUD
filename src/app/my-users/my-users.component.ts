import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import 'rxjs';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { apiService } from '../api.service';
import { Users } from '../models/users';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { Confirmation } from '../custom-classes/confirmation';

@Component({
  selector: 'app-my-users',
  templateUrl: './my-users.component.html',
  styleUrls: ['./my-users.component.css']
})
export class MyUsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'Phone', 'Email', 'Address', 'Zip', 'Operations'];
  dataSource = new MatTableDataSource<Users>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filterUserEmail")
  filterUserEmail: ElementRef;
  emailFilterInput = "";
  keyUpEvents: any;
  allUsersData: Users[];

  constructor(private router: Router, private myApiService: apiService, public dialog: MatDialog, private commonService: CommonService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUsers();
  }

  ngAfterViewInit() {
    this.initializeFilters();
  }

  logout() {
    this.commonService.showSnackBarMessage("Logout Successful");
    this.router.navigate(['login']);
  }

  getUsers() {
    this.allUsersData = this.myApiService.getUsers();
    this.dataSource.data = this.allUsersData;
  }

  openAddUserDialog(isEdit: boolean, user: Users): void {
    let newUser: Users = { FirstName: '', LastName: '', Phone: '', Email: '', Address: '', City: '', State: '', Zip: '', Notes: '' }
    
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '25%',
      data: { label: isEdit ? 'Edit User' : 'Add User', user: isEdit ? user : newUser }
    });

    dialogRef.afterClosed().subscribe(userData => {
      if (userData)
        this.addUpdateUser(userData);
    });
  }

  addUpdateUser(userData: Users) {
    this.myApiService.addUpdateUser(userData);
    this.commonService.showSnackBarMessage('Saved Succesfully');
    this.getUsers();
  }

  confirmDeleteUser(email: string): Observable<boolean> {
    let confirmation: Confirmation = {
      title: "Delete User",
      message: "Are you sure you want to delete the user associated with email account: " + email + " ?",
      button: {
        ok: "Confirm", cancel: "Cancel"
      }
    };
    return this.commonService.confirmDialog(confirmation);
  }

  deleteUser(userEmail: string) {
    this.confirmDeleteUser(userEmail).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.myApiService.removeUser(userEmail);
        this.commonService.showSnackBarMessage('Deleted Succesfully');
        this.getUsers();
      }
    });
  }

  private initializeFilters() {
    this.keyUpEvents = merge(fromEvent(this.filterUserEmail.nativeElement, "keydown")).pipe(
      filter((keyEvent: any): any => {
        return (keyEvent.keyCode === 32 && keyEvent.currentTarget.value.replace(/^\s+/, "") !== "") ||
          (keyEvent.keyCode === 8 && keyEvent.currentTarget.value.replace(/^\s+/, "") !== "") ||
          (keyEvent.keyCode >= 46 && keyEvent.keyCode <= 57) ||
          (keyEvent.keyCode >= 65 && keyEvent.keyCode <= 90) ||
          (keyEvent.keyCode >= 96 && keyEvent.keyCode <= 122) ||
          (keyEvent.keyCode >= 186 && keyEvent.keyCode <= 222);
      }));

    this.keyUpEvents.pipe(debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.getFilteredData();
      })
    ).subscribe();
  }

  getFilteredData() {
    let trimmedUserEmail = this.emailFilterInput.trim().toLowerCase();
    let ifUserEmailMatchFound = (users: Users) => (!trimmedUserEmail || users.Email.toLowerCase().includes(trimmedUserEmail));
    let filteredList = this.allUsersData.filter(x => ifUserEmailMatchFound(x));

    this.paginator.pageIndex = 0;
    this.dataSource.data = filteredList;
  }
}
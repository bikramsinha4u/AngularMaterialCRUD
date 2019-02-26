import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { apiService } from '../api.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  userForm: FormGroup;

  constructor(private commonService: CommonService, private myApiService: apiService, public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      FirstName: new FormControl(),
      LastName: new FormControl(),
      Phone: new FormControl(),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Address: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      Zip: new FormControl(),
      Notes: new FormControl()
    });
  }

  cancelUserDialog(): void {
    this.dialogRef.close();
  }

  addUpdateUser() {
    if (this.data.label == 'Add User') {
      if (this.myApiService.isUserExist(this.userForm.value.Email)) {
        this.commonService.showSnackBarMessage('Email already exists');
        return;
      }
      else {
        this.dialogRef.close(this.userForm.value);
      }
    }
    else {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
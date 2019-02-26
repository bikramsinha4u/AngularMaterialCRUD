import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../custom-classes/error-state-matcher';
import { CommonService } from '../common.service';
import { AccountDTO } from '../models/accountDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hidePassword = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  pwdFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();
  registerData: AccountDTO = { Email: null, Password: null };

  constructor(private commonService: CommonService, private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  registerUser(): void {
    if (!this.emailFormControl.valid || !this.pwdFormControl.valid)
      return;

    let result = this.authService.registerUser(this.registerData);
    if (result) {
      this.commonService.showSnackBarMessage('Registered Successfully');
      this.router.navigate(['users']);
    }
    else
      this.commonService.showSnackBarMessage('Email already exists');
  }
}
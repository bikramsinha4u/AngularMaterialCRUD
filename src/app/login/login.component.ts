import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../custom-classes/error-state-matcher';
import { AccountDTO } from '../models/accountDto';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginData: AccountDTO = { Email: null, Password: null };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  pwdFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private commonService: CommonService, private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  loginUser() {
    if (!this.emailFormControl.valid || !this.pwdFormControl.valid)
      return;
    
    let result = this.authService.loginUser(this.loginData);
    if (result) {
      this.commonService.showSnackBarMessage('Login Successful');
      this.router.navigate(['users']);
    }
    else{
      this.commonService.showSnackBarMessage('Invalid login credentials');
    }
  }
}
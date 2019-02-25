import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import { Router } from '../../../node_modules/@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  pwdFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();
  registerData = { email: null, pwd: null };


  constructor(private snackBar: MatSnackBar, private authService: AuthService, private router: Router) { }

  ngOnInit() { }
  
  registerUser() {
    if (!this.emailFormControl.valid || !this.pwdFormControl.valid)
      return;

    let result = this.authService.registerUser(this.registerData);
    if (result) {
      this.snackBar.open('Registered Successfully', undefined, { duration: 3000, horizontalPosition: "right", verticalPosition: "top" });
      this.router.navigate(['users']);
    }
    else
      this.snackBar.open('Email already exists', undefined, { duration: 3000, horizontalPosition: "right", verticalPosition: "top" });
  }
}
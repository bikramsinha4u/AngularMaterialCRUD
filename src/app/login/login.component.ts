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
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;
    loginData = { email: null, pwd: null };

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    pwdFormControl = new FormControl('', [
        Validators.required,
    ]);
    matcher = new MyErrorStateMatcher();

    constructor(private snackBar: MatSnackBar, private authService: AuthService, private router: Router) { }

    ngOnInit() { }

    loginUser() {
        if (!this.emailFormControl.valid || !this.pwdFormControl.valid)
            return;

        let result = this.authService.loginUser(this.loginData);
        if (result) {
            this.snackBar.open('Login Successful', undefined, { duration: 3000, horizontalPosition: "right", verticalPosition: "top" });
            this.router.navigate(['users']);
        }
        else
            this.snackBar.open('Invalid login credentials', undefined, { duration: 3000, horizontalPosition: "right", verticalPosition: "top" });
    }
}
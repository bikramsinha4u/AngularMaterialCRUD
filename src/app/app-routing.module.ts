import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { RegisterComponent } from 'src/app/register/register.component';
import { LoginComponent } from './login/login.component';
import { MyUsersComponent } from './my-users/my-users.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: MyUsersComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [RouterModule, { provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }
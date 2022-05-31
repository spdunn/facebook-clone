import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../shared/user.model';
import { Login } from '../users/store/users.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = true;
  users: Observable<{currentUser: User, users: User[]}>;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState> ) { }

  ngOnInit(): void {
    this.users = this.store.select('users')
  }

  login(user: User) {
    console.log(user)
    // this.authService.login(user);
    this.store.dispatch(new Login(user))
    this.router.navigate(['/feed'])
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}

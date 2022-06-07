import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { User } from '../shared/user.model';
import { AddUser, Login } from '../users/store/users.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  users: Observable<{currentUser: User, users: User[]}>;
  userSub: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState> ) { }

  ngOnInit(): void {
    this.users = this.store.select('users')
    this.userSub = this.users.subscribe(
      users => {
        console.log(users);
      }
    )
  }

  login(user: User) {
    console.log(user)
    // this.authService.login(user);
    this.store.dispatch(new Login(user))
    this.router.navigate(['/feed'])
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!this.isLoginMode) {
      this.store.dispatch(new AddUser(form.value))
      this.router.navigate(['/feed'])
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

}

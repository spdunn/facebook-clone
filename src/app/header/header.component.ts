import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from '../shared/user.model';
import { Logout } from '../users/store/users.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  currentUser: User = null;
  userSub: Subscription;

  constructor(private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('users').subscribe(
      users => {
        this.currentUser = users.currentUser;
        this.isAuthenticated = !!this.currentUser;
      }
    )
  }

  onLogout() {
    this.store.dispatch(new Logout())
    this.router.navigate([''])
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}

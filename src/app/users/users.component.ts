import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Friend, User } from '../shared/user.model';
import * as fromApp from '../store/app.reducer';
import { UpdateUser } from './store/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  userSub: Subscription
  currentUser: User = null;

  users: Observable<{currentUser: User, users: User[]}>;
  usersList: User[];

  constructor(
    private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.users = this.store.select('users')
    this.userSub = this.store.select('users').subscribe(
      users => {
        this.currentUser = users.currentUser;
        this.usersList = [...users.users];
      }
    )
  }

  // Check relationship between current user and given user
  checkFriendStatus(friend: User) {
    // console.log('Checking friend status for ', friend)
    let friendIndex = this.currentUser.friends.findIndex(f => {
      return f.id == friend.id;
    })
    if (friendIndex == -1) return 0;
    else return this.currentUser.friends[friendIndex].status;
  }

  /**
   * Handles adding a friend, accepting a request, or removing a friend
   * 4 states for friendship
          0. Not friends
          1. Friend request sent
          2. Friend request received
          3. Friends
   */
  onFriendRequest(friend: User) {
    console.log(this.currentUser, friend)
    // friend in current user's list
    let newFriend: Friend = {
      id: friend.id,
      status: 0
    }
    // current user in other user's list
    let currentFriend: Friend = {
      id: this.currentUser.id,
      status: 0
    }
    // find user in master list
    let friendIndex = this.usersList.findIndex(f => {
      return f.id == friend.id;
    })
    let otherUser = Object.assign({}, this.usersList[friendIndex]);
    // check if other user exists in current user's friends and vice versa
    let friendIndexInCurrent = this.currentUser.friends.findIndex(f => {
      return f.id == friend.id;
    })
    let currentIndexInFriend = otherUser.friends.findIndex(f => {
      return f.id == this.currentUser.id;
    })
    // Send request
    if (friendIndexInCurrent == -1 || this.currentUser.friends[friendIndexInCurrent].status == 0) {
      newFriend.status = 1;
      currentFriend.status = 2
      // Accept request
    } else if (this.currentUser.friends[friendIndexInCurrent].status == 2) {
      newFriend.status = 3;
      currentFriend.status = 3;
      // Remove friend
    } else {
      newFriend.status = 0;
      currentFriend.status = 0;
    }

    var tempUser = {...this.currentUser};
    if (friendIndexInCurrent != -1) tempUser.friends = [...tempUser.friends.slice(0, friendIndexInCurrent), newFriend, ...tempUser.friends.slice(friendIndexInCurrent + 1)];
    else tempUser.friends = [...tempUser.friends, (newFriend)];

    if (currentIndexInFriend != -1) otherUser.friends = [...otherUser.friends.slice(0, currentIndexInFriend), currentFriend, ...otherUser.friends.slice(currentIndexInFriend + 1)];
    else otherUser.friends = [...otherUser.friends, (currentFriend)];

    this.store.dispatch(new UpdateUser(tempUser));
    this.store.dispatch(new UpdateUser(otherUser));

  }

  goToProfile(user: User) {
    console.log(user)
    this.router.navigate(['/profile/' + user.id])
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}

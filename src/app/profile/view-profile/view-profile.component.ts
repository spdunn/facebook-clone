import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddPost, LikePost, SharePost } from '../../feed/store/feed.actions';
import { Post } from '../../shared/post.model';
import { User } from '../../shared/user.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  currentUser: User = null;
  users: User[] = [];
  profileUser: User = null;
  userSub: Subscription;
  profileId: string = null;
  friends: User[] = [];
  totalPosts: Post[] = [];
  userPosts: Post[] = [];
  feedSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.select('users').subscribe((users) => {
      console.log('updating user in profile', users);
      this.currentUser = users.currentUser;
      this.users = users.users;

      this.profileId = this.route.snapshot.params['id'];
      console.log(this.route);
      this.profileUser = this.users.find((u) => {
        return u.id == this.profileId;
      });
      console.log(this.profileUser);

      this.friends = this.users.filter((u) => {
        return this.profileUser.friends.find(
          (f) => f.id == u.id && f.status == 3
        );
      });

      console.log('here are my friends: ', this.friends);
    });
    this.feedSub = this.store.select('feed').subscribe((feed) => {
      this.userPosts = feed.posts.filter((p) => p.author.id == this.profileId);
      this.totalPosts = feed.posts;
    });
  }

  editProfile() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  hasUserLiked(post: Post) {
    return post.likes.find((u) => {
      return u.id == this.currentUser.id;
    });
  }

  onLike(post: Post) {
    const user = this.currentUser;
    this.store.dispatch(new LikePost({post, user}));
  }

  onShare(post: Post) {
    const user = this.currentUser;
    this.store.dispatch(new SharePost({post, user}));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

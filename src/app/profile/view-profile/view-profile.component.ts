import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddPost, LikePost } from '../../feed/store/feed.actions';
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

      console.log('here are my friend: ', this.friends);
    });
    this.feedSub = this.store.select('feed').subscribe((feed) => {
      this.userPosts = feed.posts.filter((p) => p.author.id == this.profileId);
      this.totalPosts = feed.posts;
    });
  }

  editProfile() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  // Outsource these functions to service/ngrx later
  hasUserLiked(post: Post) {
    return post.likes.find((u) => {
      return u.email == this.currentUser.email;
    });
  }

  onLike(post: Post) {
    const likedPost : Post = {
      ...post,
      likes: [
        ...post.likes,
        this.currentUser,
      ]
    };
    console.log('post sent to reducer:', likedPost);
    this.store.dispatch(new LikePost(likedPost));
  }

  onShare(post: Post) {
    const newAuthor: User = {
      ...this.currentUser,
      firstName:
        this.currentUser.firstName +
        ' (shared from ' +
        post.author.firstName +
        ' ' +
        post.author.lastName +
        ')',
    };
    const sharedPost : Post = {
      id: (this.totalPosts.length + 1).toString(),
      author: newAuthor,
      content: post.content,
      likes: [this.currentUser]
    };
    this.store.dispatch(new AddPost(sharedPost));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

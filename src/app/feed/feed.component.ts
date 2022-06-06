import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Post } from '../shared/post.model';
import { Friend, User } from '../shared/user.model';
import * as fromApp from '../store/app.reducer';
import { AddPost, LikePost, SharePost } from './store/feed.actions';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnDestroy {
  currentUser: User = null;
  userSub: Subscription;
  feedSub: Subscription;
  // posts: Observable<{posts: Post[]}>;
  posts: Post[];
  myPosts: Post[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // this.posts = this.store.select('feed');
    this.userSub = this.store.select('users').subscribe((users) => {
      this.currentUser = users.currentUser;
    });
    this.feedSub = this.store.select('feed').subscribe((posts) => {
      this.posts = posts.posts;
      // Only get posts from yourself or friends
      this.myPosts = posts.posts.filter((p) => {
        return (
          this.currentUser.friends.find((f) => {
            return f.id === p.author.id && (f.status === 1 || f.status === 3)
          }) || p.author.id == this.currentUser.id
        );
      });
    });
  }

  hasUserLiked(post: Post) {
    return post.likes.find((u) => {
      return u.id == this.currentUser.id;
    });
  }

  onPost(form: NgForm) {
    console.log(form);
    let newPost: Post = {
      id: (this.posts.length + 1).toString(),
      author: this.currentUser,
      content: form.value.message,
      likes: [this.currentUser]
    };
    this.store.dispatch(new AddPost(newPost));
    form.reset();
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
    this.feedSub.unsubscribe();
  }
}

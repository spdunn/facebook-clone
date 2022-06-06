import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Post } from '../shared/post.model';
import { Friend, User } from '../shared/user.model';
import * as fromApp from '../store/app.reducer';
import { AddPost, LikePost } from './store/feed.actions';

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
          this.currentUser.friends.find((f) => f.id == p.author.id) ||
          p.author.id == this.currentUser.id
        );
      });
    });
  }

  hasUserLiked(post: Post) {
    return post.likes.find((u) => {
      return u.email == this.currentUser.email;
    });
  }

  onPost(form: NgForm) {
    console.log(form);
    let newPost: Post = new Post(
      (this.posts.length + 1).toString(),
      this.currentUser,
      form.value.message,
      [this.currentUser]
    );
    this.store.dispatch(new AddPost(newPost));
    form.reset();
  }

  onLike(post: Post) {
    var likedPost = new Post(post.id, post.author, post.content, [
      ...post.likes,
      this.currentUser,
    ]);
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
    const sharedPost = new Post(
      (this.posts.length + 1).toString(),
      newAuthor,
      post.content,
      [this.currentUser]
    );
    this.store.dispatch(new AddPost(sharedPost));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.feedSub.unsubscribe();
  }
}

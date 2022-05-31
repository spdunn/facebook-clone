import { Action } from "@ngrx/store";
import { Post } from "src/app/shared/post.model";

export const ADD_POST = 'ADD_POST';
export const DEL_POST = 'DEL_POST';
export const LIKE_POST = 'LIKE_POST';

export class AddPost implements Action {
  readonly type = ADD_POST;

  constructor(public payload: Post) {}
}

export class DeletePost implements Action {
  readonly type = DEL_POST;

  constructor(public payload: string) {}
}

export class LikePost implements Action {
  readonly type = LIKE_POST;

  constructor(public payload: Post) {}
}

export type FeedActions = AddPost | DeletePost | LikePost;

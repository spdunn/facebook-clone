import * as FeedActions from './feed.actions';
import postsJson from '../../shared/posts.json';
import { Post } from 'src/app/shared/post.model';

export interface State {
  posts: Post[];
}

const initialState: State = {
  posts: postsJson,
};

export function feedReducer(
  state = initialState,
  action: FeedActions.FeedActions
) {
  switch (action.type) {
    case FeedActions.ADD_POST:
      if (
        state.posts.find((post) => {
          return post.id == action.payload.id;
        })
      )
        return state;
      console.log('new post added:', action.payload);
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case FeedActions.DEL_POST:
      var index = state.posts.findIndex((post) => {
        return post.id == action.payload;
      });
      console.log(index);
      if (index == -1) return state;

      var newArr = [...state.posts];
      newArr.splice(index, 1);
      console.log(newArr);
      return {
        ...state,
        posts: newArr,
      };
    case FeedActions.LIKE_POST:
      console.log('payload: ', action.payload);
      var index = state.posts.findIndex((post) => {
        return post.id == action.payload.post.id;
      });
      var newArr = [...state.posts];
      newArr[index] = {
        ...action.payload.post,
        likes: [...action.payload.post.likes, action.payload.user],
      };
      console.log(newArr, 'reducer');
      return {
        ...state,
        posts: newArr,
      };
    case FeedActions.SHARE_POST:
      console.log('payload: ', action.payload);
      var index = state.posts.findIndex((post) => {
        return post.id == action.payload.post.id;
      });
      var newPost = {
        ...state.posts[index],
        id: (state.posts.length + 1).toString(),
        author: {
          ...action.payload.user,
          firstName:
            action.payload.user.firstName +
            ' (shared from ' +
            action.payload.post.author.firstName +
            ' ' +
            action.payload.post.author.lastName +
            ')',
        },
        likes: [action.payload.user]
      };
      console.log(newPost, 'reducer');
      return {
        ...state,
        posts: [
          ...state.posts,
          newPost
        ],
      };
    default:
      return state;
  }
}

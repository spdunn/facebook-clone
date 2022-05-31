import * as fromUsers from '../users/store/users.reducer';
import * as fromFeed from '../feed/store/feed.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  users: fromUsers.State;
  feed: fromFeed.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  users: fromUsers.usersReducer,
  feed: fromFeed.feedReducer
}

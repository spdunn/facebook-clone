import * as UserActions from './users.actions';
import usersJson from '../../shared/users.json';
import { User } from 'src/app/shared/user.model';

export interface State {
  currentUser: User;
  users: User[];
}

const initialState: State = {
  currentUser: null,
  users: usersJson,
};

export function usersReducer(
  state = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.ADD_USER:
      if (
        state.users.find((user) => {
          return user.id == action.payload.id;
        })
      )
        return state;

      const newUser: User = {
        ...action.payload,
        id: (state.users.length + 1).toString(),
        friends: [],
      };
      return {
        ...state,
        users: [...state.users, newUser],
        currentUser: newUser,
      };

    case UserActions.UPDATE_USER:
      const index = state.users.findIndex((user) => {
        return user.id == action.payload.id;
      });
      console.log(index);
      if (index == -1) return state;

      const newArr = [...state.users];
      newArr[index] = { ...action.payload };

      const newCurrentUser =
        state.currentUser.id == action.payload.id
          ? { ...action.payload }
          : { ...state.currentUser };

      console.log(newArr);
      return {
        ...state,
        currentUser: newCurrentUser,
        users: newArr,
      };

    case UserActions.LOGIN:
      return {
        ...state,
        currentUser: { ...action.payload },
      };

    case UserActions.LOGOUT:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
}

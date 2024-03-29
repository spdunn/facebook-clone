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
  function storeUser(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }
  function removeUser() {
    localStorage.removeItem('userData');
  }

  switch (action.type) {
    case UserActions.ADD_USER:
      if (
        state.users.find((user) => {
          return user.email == action.payload.email;
        })
      )
        return state;
        return state;

    case UserActions.ADD_USER_SUCCESS:
      const newUser: User = {
        ...action.payload,
        id: (state.users.length + 1).toString(),
        friends: [],
      };
      storeUser(newUser);
      return {
        ...state,
        users: [...state.users, newUser],
        currentUser: newUser,
      };

    case UserActions.ADD_USER_FAILURE:
      return state;

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
      storeUser(action.payload);
      return {
        ...state,
        currentUser: { ...action.payload },
      };

    case UserActions.LOGOUT:
      removeUser();
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
}

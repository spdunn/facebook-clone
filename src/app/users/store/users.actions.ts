import { Action } from "@ngrx/store";
import { User } from "src/app/shared/user.model";

export const ADD_USER = '[USER] Add User';
export const ADD_USER_SUCCESS = '[USER] Add User Success';
export const ADD_USER_FAILURE = '[USER] Add User Failure';
export const UPDATE_USER = '[USER] Update User'
export const UPDATE_USER_SUCCESS = '[USER] Update User Success'
export const UPDATE_USER_FAILURE = '[USER] Update User Failure'
export const LOGIN = '[USER] Login'
// export const LOGIN_SUCCESS = '[USER] Login Success'
// export const LOGIN_FAILURE = '[USER] Login Failure'
export const LOGOUT = '[USER] Logout'

// Log in as given user
export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}

// Logout and return to unauthorized site
export class Logout implements Action {
  readonly type = LOGOUT;

}

// Create new user
export class AddUser implements Action {
  readonly type = ADD_USER

  constructor(public payload: User) {}
}

export class AddUserSuccess implements Action {
  readonly type = ADD_USER_SUCCESS;


}

export class AddUserFailure implements Action {
  readonly type = ADD_USER_FAILURE;


}

// Update existing user
export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export type UserActions = AddUser | UpdateUser | Login | Logout;

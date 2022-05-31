import { Action } from "@ngrx/store";
import { User } from "src/app/shared/user.model";

export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;

}

export class AddUser implements Action {
  readonly type = ADD_USER

  constructor(public payload: User) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export type UserActions = AddUser | UpdateUser | Login | Logout;

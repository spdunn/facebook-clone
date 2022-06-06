import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import * as UserActions from './users.actions'

@Injectable()
export class UsersEffects {

  userLogin = this.actions$.pipe(
    ofType(UserActions.LOGIN)
  );

  userAddUser = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.ADD_USER),
      map((data) => console.log(data))
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions) {}
}

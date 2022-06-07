import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of } from 'rxjs';
import { User } from 'src/app/shared/user.model';

import * as UserActions from './users.actions';

@Injectable()
export class UsersEffects {
  userLogin = this.actions$.pipe(ofType(UserActions.LOGIN));

  userAddUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.ADD_USER),
      map((data: UserActions.AddUser) =>
        {
          console.log(data)
          return new UserActions.AddUserSuccess(data.payload)
        }
      ),
      catchError((err) =>
        of(new UserActions.AddUserFailure({ errorMessage: err.message }))
      )
    )
  );

  constructor(private actions$: Actions) {}
}

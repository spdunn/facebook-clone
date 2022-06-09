import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { select } from '@ngrx/store';

import * as fromApp from './store/app.reducer'

@Injectable()
export class AuthGuard {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select((state) => state.users),
      map(state => {
        if (state.currentUser) return true;
        this.router.navigate(['/']);
        return false;
      })
    )
  }
}

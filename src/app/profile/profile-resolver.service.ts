import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

/**
 *  Resolver to pre load profile data.
 *  TODO: Load something
 */
export class ProfileResolver implements Resolve<number>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<number> | Promise<number> | number {
    return of(1);
  }
}

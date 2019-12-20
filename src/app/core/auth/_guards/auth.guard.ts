// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { AppState } from '../../../core/reducers/';

// RxJS
// NGRX
// Auth reducers and selectors
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        /*return this.store
            .pipe(
                select(isLoggedIn),
                tap(loggedIn => {
                    if (!loggedIn) {
                        this.router.navigateByUrl('/auth/login');
                    }
                })
            );*/
        const tokenInfo = sessionStorage.getItem('tokenInfo');
        console.log('tokenInfo',tokenInfo)
		console.log('local',sessionStorage.getItem('tokenInfo') )
        if (tokenInfo) {
            return of(true);
        } else {
            this.router.navigateByUrl('/auth/login');
            return of(false);
        }
    }
}

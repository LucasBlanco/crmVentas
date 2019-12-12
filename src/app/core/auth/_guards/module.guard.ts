// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { AppState } from '../../../core/reducers/';

// RxJS
// NGRX
// Module reducers and selectors
@Injectable()
export class ModuleGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        /*const moduleName = route.data['moduleName'] as string;
        if (!moduleName) {
            return of(false);
        }

        return this.store
            .pipe(
                select(currentUserPermissions),
                map((permissions: Permission[]) => {
                    const _perm = find(permissions, (elem: Permission) => {
                        return elem.title.toLocaleLowerCase() === moduleName.toLocaleLowerCase();
                    });
                    return _perm ? true : false;
                }),
                tap(hasAccess => {
                    if (!hasAccess) {
                        this.router.navigateByUrl('/error/403');
                    }
                })
            );*/
        const tokenInfo = localStorage.getItem('tokenInfo');
        if (tokenInfo) {
            return of(true);
        } else {
            this.router.navigateByUrl('/error/403');
            return of(false);
        }
    }
}

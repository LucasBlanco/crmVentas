import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserService } from '../../services/user.service';

@Injectable()
export class Guard implements CanActivate {
    constructor(private userSrv: UserService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (state.url === '/dashboard/landing') {
            return of(true);
        }
        this.router.navigateByUrl('/dashboard/landing');
        return of(true);
        /*try {
            const user = this.userSrv.getCurrentUser();
            const esSupervisor = user.perfiles.some(p => p.toLocaleLowerCase() === 'supervisor call');
            const esOperador = user.perfiles.some(p => p.toLocaleLowerCase() === 'operador venta');
            const id = user.id;
            if (esSupervisor) {
                if (state.url === '/dashboard/supervisorcall' || state.url.includes('/dashboard/vendedora/')) {
                    return of(true);
                }
                this.router.navigateByUrl('/dashboard/supervisorcall');
            }
            if (esOperador) {
                if (state.url.includes('/dashboard/vendedora/')) {
                    return of(true);
                }
                this.router.navigateByUrl('/dashboard/vendedora/' + id);
            }
            if (state.url === '/dashboard/landing') {
                return of(true);
            }
            this.router.navigateByUrl('/dashboard/landing');
            return of(true);
        } catch {
            this.router.navigateByUrl('/dashboard/landing');
            return of(true);
        }*/
    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActividadSesionService } from '@servicios/actividad-sesion.service';
import { Observable, of } from 'rxjs';

import { AppState } from '../../../core/reducers/';

// Angular
// RxJS
// NGRX
// Auth reducers and selectors
@Injectable()
export class AuthGuard implements CanActivate {

    esElPrimerLogin = true;

    constructor(private store: Store<AppState>, private router: Router, private actividadSesion: ActividadSesionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const tokenInfo = sessionStorage.getItem('tokenInfo');

        if (tokenInfo) {
            if (this.router.url !== '/auth/login' && this.esElPrimerLogin) {
                this.esElPrimerLogin = false;
                this.actividadSesion.iniciarSesion();
            }
            return of(true);
        } else {
            this.router.navigateByUrl('/auth/login');
            return of(false);
        }
    }
}

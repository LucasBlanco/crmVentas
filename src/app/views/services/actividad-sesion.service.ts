import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadSesion } from '@modelos/actividadSesion';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ActividadSesionService {

	constructor(private http: HttpClient, private router: Router) { }

	logout() {
		console.log('asdasdas');
		this.http.post(environment.ip + '/actividadesSesion/logout', {}).subscribe();
		sessionStorage.setItem('tokenInfo', '');
		this.router.navigateByUrl('/auth/login');
	}

	onWindowClose() {
		return this.http.post(environment.ip + '/actividadesSesion/logout', {}).toPromise();
	}

	iniciarBreak() {
		this.http.post(environment.ip + '/actividadesSesion/iniciarBreak', {}).subscribe();
	}


	finalizarBreak() {
		this.http.post(environment.ip + '/actividadesSesion/finBreak', {}).subscribe();
	}

	iniciarSesion() {
		this.http.post(environment.ip + '/actividadesSesion/inicioSesion', {}).subscribe();
	}

	public mapToFront(operadorBack) {
		return new ActividadSesion({ actividad: operadorBack.actividad, id: operadorBack.id, fecha: operadorBack.fecha });
	}
}

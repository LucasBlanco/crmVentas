import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Localidad } from "@modelos/localidad";
import { ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LocalidadesService {

	private localidades$ = new ReplaySubject<Localidad[]>();
	firstLoad = true;
	constructor(private http: HttpClient) { }

	traerTodos() {
		if (this.firstLoad) {
			this.http.get<Localidad[]>(environment.ip + '/localidades').pipe(
				map(localidades => localidades.map(this.mapToFront))
			).subscribe(localidades => this.localidades$.next(localidades));
			this.firstLoad = false;
		}
		return this.localidades$;
	}

	mapToFront(localidad) {
		return new Localidad({ nombre: localidad.nombre, id: localidad.id });

	}
}

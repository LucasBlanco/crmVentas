import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Localidad} from "@modelos/localidad";

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  constructor(private http: HttpClient) { }

	traerTodos() {
		return this.http.get<Localidad[]>(environment.ip + '/localidades').pipe(
			map(localidades => localidades.map(this.mapToFront))
		)
		// return new BehaviorSubject(this.localidads);
	}

	mapToFront(localidad)
	{
		return new Localidad({nombre: localidad.nombre, id:localidad.id})

	}
}

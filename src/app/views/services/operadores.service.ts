import { Injectable } from '@angular/core';
import { Operador } from '@modelos/operador';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators"
import {ActividadSesionService} from "@servicios/actividad-sesion.service";

@Injectable({
  providedIn: 'root'
})
export class OperadoresService {

	operadores: Operador[];

	constructor(private http: HttpClient, private actividadSesionSrv: ActividadSesionService) {

	}

	traerTodos() {
		return this.http.get<Operador[]>(environment.ip + '/usuarios/operadores').pipe(
			map(operadores => {
				return operadores.map(x => this.mapToFront(x))
				})
		)
	}

	mapToFront(operadorBack) {
		let actividades = operadorBack.actividadReciente ? operadorBack.actividadReciente.map(x => this.actividadSesionSrv.mapToFront(x)) : []
		return new Operador({nombre: operadorBack.nombre, id:operadorBack.id, actividadReciente: actividades})
	}
}

import { Injectable } from '@angular/core';
import { Operador } from '@modelos/operador';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class OperadoresService {

	operadores: Operador[];

	constructor(private http: HttpClient) {
		/*const operador1: Operador = getFakeOperador();
        const operador2: Operador = getFakeOperador();
        this.operadores = [operador1, operador2];*/
	}

	traerTodos() {
		return this.http.get<Operador[]>(environment.ip + '/usuarios/operadores').pipe(
			map(operadores => operadores.map(this.mapToFront))
		)
	}

	private mapToFront(operadorBack){
		return new Operador({nombre: operadorBack.nombre, id:operadorBack.id})
	}
}

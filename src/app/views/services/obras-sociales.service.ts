import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ObraSocial} from "@modelos/obraSocial";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {UserService} from "@servicios/user.service";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObrasSocialesService {

	constructor(private http: HttpClient, private userSrv: UserService) { }

	traerTodos() {
		console.log(this.userSrv.getCurrentUser())
		return new BehaviorSubject(this.userSrv.getCurrentUser().obrasSociales)
		// return new BehaviorSubject(this.obraSocials);
	}

	mapToFront(obraSocial)
	{
		return new ObraSocial({nombre: obraSocial.nombre, id:obraSocial.id})

	}
}

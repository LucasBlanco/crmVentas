import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Interface} from "readline";
import {map} from "rxjs/operators";
import {Seguimiento} from "@modelos/seguimiento";
import {Operador} from "@modelos/operador";
import {PersonaService} from "@servicios/persona.service";
import {ObrasSocialesService} from "@servicios/obras-sociales.service";
import {EstadoService} from "@servicios/estado.service";

@Injectable({
  providedIn: 'root'
})
export class SeguimientosService {

  constructor(
  	private http: HttpClient,
	private personaSrv: PersonaService,
	private obraSocialSrv: ObrasSocialesService,
  	private estadoSrv: EstadoService
  ) { }

  crear(seguimiento){
  	console.log('oda2')
  	this.http.post(environment.ip+'/ventas', seguimiento).subscribe(p => console.log(p))
  }

  traerTodos(params: Parametros) {
  	let param = new HttpParams()
	if(params.obraSocial)
		param = param.set('obraSocial', params.obraSocial.toString())
	if(params.operador)
		param = param.set('user', params.operador.toString())
	  if(params.desde)
		param = param.set('fechaDesde', params.desde)
	  if(params.hasta)
		param = param.set('fechaHasta', params.hasta)
	  if(params.cuil)
		param = param.set('cuil', params.cuil.toString())

	  let options = {params: param}
  		return this.http.get<Seguimiento[]>(environment.ip+'/ventas', options).pipe(
			map(seguimientos => seguimientos.map(x => this.mapToFront(x)))
		)
  }

  mapToFront(seguimiento){
	  let persona = this.personaSrv.mapToFront(seguimiento.persona)
	  let obraSocial = seguimiento.obraSocial ? this.obraSocialSrv.mapToFront(seguimiento.obraSocial) : null
	  let estados = seguimiento.estados.map(estado => this.estadoSrv.mapToFront(estado))
	  return new Seguimiento({id: seguimiento.id, tresPorciento:seguimiento.tresPorciento, persona, obraSocial, estados})
  }
}

interface Parametros {
	obraSocial: number;
	operador: number;
	desde: string;
	hasta: string;
	cuil: number;
}

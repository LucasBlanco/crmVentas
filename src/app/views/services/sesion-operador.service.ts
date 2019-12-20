import { Injectable } from '@angular/core';
import * as moment from "moment";
import Pusher from 'pusher-js';
import {OperadoresService} from "@servicios/operadores.service";
import {BehaviorSubject} from "rxjs";
import {Operador} from "@modelos/operador";
import {ActividadSesion} from "@modelos/actividadSesion";


export interface SesionOperador extends Operador{
	estado: { nombre: string, fechaCambio: string }
}

@Injectable({
  providedIn: 'root'
})
export class SesionOperadorService {

	sesionOperadores$ = new BehaviorSubject<SesionOperador[]>([]);
  constructor(private operadorSrv: OperadoresService) {
	  var pusher = new Pusher('e7b3f11c95045ebe9b9c', {
		  cluster: 'us2'
	  });
	  var channel = pusher.subscribe('supervisorcall');
	  channel.bind('usuario.conectado', (data) => {
	  	const sesiones = this.cambiarEstadoOperador(data.id, "Conectado")
	  	this.sesionOperadores$.next(sesiones)
	  });
	  channel.bind('usuario.desconectado', (data) => {
		  const sesiones = this.cambiarEstadoOperador(data.id, "Desconectado")
		  this.sesionOperadores$.next(sesiones)
	  });
	  channel.bind('usuario.enbreak', (data) => {
		  const sesiones = this.cambiarEstadoOperador(data.id, "Break")
		  this.sesionOperadores$.next(sesiones)
	  });
  }

  private cambiarEstadoOperador(id, estado){
	  return this.sesionOperadores$.value.map( sesionOperador => {
		  return sesionOperador.id === id ? {...sesionOperador, estado: {nombre: estado, fechaCambio: moment().format("YYYY-MM-DD hh:mm:ss")}} : sesionOperador
	  });
  }

  traerTodos(){
  	this.operadorSrv.traerTodos().subscribe( operadores => {
  		const sesionesOperador = operadores.map( operador => {
  			return {
  				...operador,
				estado: {
  					nombre: this.getEstado(operador),
					fechaCambio: operador.ultimaActividad? operador.ultimaActividad.fecha : ''
  				}
  			}
		})
  		this.sesionOperadores$.next(sesionesOperador)
	})
	return this.sesionOperadores$
  }


	getEstado(operador: Operador){
		switch (operador.ultimaActividad) {
			case "Inicio sesion":
				return "Conectado";
			case "Cerrar sesion":
				return "Desconectado";
			case "Inicio break":
				return "Break";
			case "Fin break":
				return "Conectado";
			default:
				return "Sin actividad";
		}
	}


}

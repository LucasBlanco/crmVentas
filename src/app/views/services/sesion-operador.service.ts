import { Injectable } from '@angular/core';
import { Operador } from '@modelos/operador';
import { OperadoresService } from '@servicios/operadores.service';
import * as moment from 'moment';
import Pusher from 'pusher-js';
import { BehaviorSubject, Observable } from 'rxjs';

import { IOperador } from './../models/operador';

interface ISesionOperador extends IOperador {
	estado: { nombre: string, fechaCambio: string }
}
export class SesionOperador extends Operador implements ISesionOperador {
	constructor({ estado, ...operador }: ISesionOperador) {
		super(operador);
		this.estado = estado;
	}
	estado: { nombre: string, fechaCambio: string };
}

@Injectable({
	providedIn: 'root'
})
export class SesionOperadorService {

	sesionOperadores$ = new BehaviorSubject<SesionOperador[]>([]);
	constructor(private operadorSrv: OperadoresService) {
		const pusher = new Pusher('e7b3f11c95045ebe9b9c', {
			cluster: 'us2'
		});
		const channel = pusher.subscribe('supervisorcall');
		channel.bind('usuario.conectado', (sesion) => {
			const sesiones = this.cambiarEstadoOperador(sesion.id, 'Conectado');
			this.sesionOperadores$.next(sesiones);
		});
		channel.bind('usuario.desconectado', (sesion) => {
			const sesiones = this.cambiarEstadoOperador(sesion.id, 'Desconectado');
			this.sesionOperadores$.next(sesiones);
		});
		channel.bind('usuario.enbreak', (sesion) => {
			const sesiones = this.cambiarEstadoOperador(sesion.id, 'Break');
			this.sesionOperadores$.next(sesiones);
		});
	}

	private cambiarEstadoOperador(id, estado) {
		return this.sesionOperadores$.value.map(sesionOperador => {
			if (sesionOperador.id === id) {
				sesionOperador.estado = { nombre: estado, fechaCambio: moment().format('YYYY-MM-DD hh:mm:ss') };
			}
			return sesionOperador;
		});
	}

	traerTodos(): Observable<SesionOperador[]> {
		this.operadorSrv.traerTodos().subscribe(operadores => {
			const sesionesOperador = operadores.map(operador => {
				return new SesionOperador({
					estado: {
						nombre: this.getEstado(operador),
						fechaCambio: operador.ultimaActividad ? operador.ultimaActividad.fecha : ''
					},
					...operador
				})
			})
			this.sesionOperadores$.next(sesionesOperador);
		})
		return this.sesionOperadores$;
	}


	getEstado(operador: Operador) {
		switch (operador.ultimaActividad.actividad) {
			case 'Inicio sesion':
				return 'Conectado';
			case 'Cerrar sesion':
				return 'Desconectado';
			case 'Inicio break':
				return 'Break';
			case 'Fin break':
				return 'Conectado';
			default:
				return 'Sin actividad';
		}
	}


}

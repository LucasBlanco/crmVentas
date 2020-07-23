import { Paginator } from './../helpers/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seguimiento } from '@modelos/seguimiento';
import { AgendadoService } from '@servicios/agendado.service';
import { EstadoService } from '@servicios/estado.service';
import { ObrasSocialesService } from '@servicios/obras-sociales.service';
import { Moment } from 'moment';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PersonaMapperService } from './persona-mapper.service';
import { LaravelPaginatorData, LaravelPaginatorAdapter } from '../helpers/laravel-paginator';

interface Parametros {
	obraSocial: number;
	operador: number;
	desde: Moment;
	hasta: Moment;
	cuil: number;
	estado: string;
}

@Injectable({
	providedIn: 'root'
})
export class SeguimientosService {

	constructor(
		private http: HttpClient,
		private personaSrv: PersonaMapperService,
		private obraSocialSrv: ObrasSocialesService,
		private estadoSrv: EstadoService,
		private agendadoSrv: AgendadoService
	) { }

	crear(seguimiento) {
		this.http.post(environment.ip + '/ventas', seguimiento).subscribe(p => console.log(p));
	}

	traerTodos(params: Parametros): LaravelPaginatorAdapter<Seguimiento> {
		const paginator = new LaravelPaginatorAdapter<Seguimiento>(
			this.traerTodosParaPaginar(params).bind(this),
			this.mapToFront.bind(this)
		);
		return paginator;
	}

	traerTodosParaPaginar = (params: Parametros) => (param: HttpParams) => {
		if (params.obraSocial) {
			param = param.set('obraSocial', params.obraSocial.toString());
		}
		if (params.operador) {
			param = param.set('user', params.operador.toString());
		}
		if (params.desde) {
			param = param.set('fechaDesde', params.desde.format('YYYY-MM-DD'));
		}
		if (params.hasta) {
			param = param.set('fechaHasta', params.hasta.format('YYYY-MM-DD'));
		}
		if (params.cuil) {
			param = param.set('cuil', params.cuil.toString());
		}
		if (params.estado) {
			param = param.set('ultimoEstado[]', params.estado);
		}
		const options = { params: param };
		return this.http.get<any[]>(environment.ip + '/ventas', options);
	};

	mapToFront(seguimiento) {
		const persona = this.personaSrv.mapToFront(seguimiento.persona);
		const obraSocial = seguimiento.obraSocial ? this.obraSocialSrv.mapToFront(seguimiento.obraSocial) : null;
		const estados = seguimiento.estados.map(estado => this.estadoSrv.mapToFront(estado));
		const agendados = seguimiento.agendados.map(agendado => this.agendadoSrv.mapToFront(agendado));
		return new Seguimiento({ id: seguimiento.id, tresPorciento: seguimiento.tresPorciento, persona, obraSocial, estados, agendados });
	}
}


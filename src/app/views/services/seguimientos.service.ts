import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seguimiento } from '@modelos/seguimiento';
import { AgendadoService } from '@servicios/agendado.service';
import { EstadoService } from '@servicios/estado.service';
import { ObrasSocialesService } from '@servicios/obras-sociales.service';
import { PersonaService } from '@servicios/persona.service';
import { Moment } from 'moment';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

interface Parametros {
	obraSocial: number;
	operador: number;
	desde: Moment;
	hasta: Moment;
	cuil: number;
}

@Injectable({
	providedIn: 'root'
})
export class SeguimientosService {

	constructor(
		private http: HttpClient,
		private personaSrv: PersonaService,
		private obraSocialSrv: ObrasSocialesService,
		private estadoSrv: EstadoService,
		private agendadoSrv: AgendadoService
	) { }

	crear(seguimiento) {
		console.log('oda2');
		this.http.post(environment.ip + '/ventas', seguimiento).subscribe(p => console.log(p));
	}

	traerTodos(params: Parametros) {
		let param = new HttpParams();
		if (params.obraSocial)
			param = param.set('obraSocial', params.obraSocial.toString());
		if (params.operador)
			param = param.set('user', params.operador.toString());
		if (params.desde)
			param = param.set('fechaDesde', params.desde.format('YYYY-MM-DD'));
		if (params.hasta)
			param = param.set('fechaHasta', params.hasta.format('YYYY-MM-DD'));
		if (params.cuil)
			param = param.set('cuil', params.cuil.toString());

		let options = { params: param };
		return this.http.get<Seguimiento[]>(environment.ip + '/ventas', options).pipe(
			map(seguimientos => seguimientos.map(x => this.mapToFront(x)))
		);
	}

	mapToFront(seguimiento) {
		let persona = this.personaSrv.mapToFront(seguimiento.persona);
		let obraSocial = seguimiento.obraSocial ? this.obraSocialSrv.mapToFront(seguimiento.obraSocial) : null;
		let estados = seguimiento.estados.map(estado => this.estadoSrv.mapToFront(estado));
		let agendados = seguimiento.agendados.map(agendado => this.agendadoSrv.mapToFront(agendado));
		return new Seguimiento({ id: seguimiento.id, tresPorciento: seguimiento.tresPorciento, persona, obraSocial, estados, agendados });
	}
}


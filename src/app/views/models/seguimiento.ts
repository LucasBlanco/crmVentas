import { Agendado } from '@modelos/agendado';
import { Estado } from '@modelos/estado';
import { ObraSocial } from '@modelos/obraSocial';
import { Persona } from '@modelos/persona';

export interface ISeguimiento {
	obraSocial: ObraSocial;
	persona: Persona;
	tresPorciento: number;
	estados: Estado[];
	agendados: Agendado[];
	id: number;
}

export class Seguimiento implements ISeguimiento {
	obraSocial: ObraSocial;
	persona: Persona;
	tresPorciento: number;
	id: number;
	estados: Estado[];
	agendados: Agendado[];
	constructor(seguimiento: ISeguimiento) {
		this.obraSocial = seguimiento.obraSocial;
		this.persona = seguimiento.persona;
		this.tresPorciento = seguimiento.tresPorciento;
		this.id = seguimiento.id;
		this.estados = seguimiento.estados;
		this.agendados = seguimiento.agendados;
	}
}

import {ObraSocial} from "@modelos/obraSocial";
import {Persona} from "@modelos/persona";
import {Estado} from "@modelos/estado";

export interface ISeguimiento {
	obraSocial: ObraSocial;
	persona: Persona;
	tresPorciento: number;
	estados: Estado[];
	id: number;
}

export class Seguimiento implements ISeguimiento {
	obraSocial: ObraSocial;
	persona: Persona;
	tresPorciento: number;
	id: number;
	estados: Estado[];
	constructor(seguimiento: ISeguimiento) {
		this.obraSocial = seguimiento.obraSocial;
		this.persona = seguimiento.persona;
		this.tresPorciento= seguimiento.tresPorciento;
		this.id = seguimiento.id;
		this.estados = seguimiento.estados;
	}
}

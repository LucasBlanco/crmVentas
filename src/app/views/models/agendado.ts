import {Operador} from "@modelos/operador";

const faker = require('faker/locale/es');

export interface IAgendado {
	fecha: string;
	nota: string;
	rellamado: boolean;
	usuario: Operador;
	id: number;
}

export class Agendado implements IAgendado {
	fecha: string;
	nota: string;
	rellamado: boolean;
	usuario: Operador;
	id: number;
	constructor(fuente: IAgendado) {
		this.fecha = fuente.fecha;
		this.nota= fuente.nota;
		this.rellamado = fuente.rellamado;
		this.usuario = fuente.usuario;
		this.id = fuente.id;
	}
}



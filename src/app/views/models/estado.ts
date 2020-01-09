import {Operador} from "@modelos/operador";

export interface IEstado {
	estado: string;
	id: number;
	usuario: Operador;
	fecha: string;
	observacion: string

}

export class Estado implements IEstado {
	estado: string;
	id: number;
	usuario: Operador;
	fecha: string;
	observacion: string
	constructor(fuente: IEstado) {
		this.estado = fuente.estado;
		this.id = fuente.id;
		this.usuario = fuente.usuario;
		this.fecha = fuente.fecha;
		this.observacion = fuente.observacion;
	}
}


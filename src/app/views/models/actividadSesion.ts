

export interface IActividadSesion {
	fecha: any;
	id: number;
	actividad: string;
}

export class ActividadSesion implements IActividadSesion{
	actividad: string;
	id: number;
	fecha:any;
	constructor(contacto: IActividadSesion) {
		this.actividad = contacto.actividad;
		this.fecha= contacto.fecha;
		this.id = contacto.id;

	}
}

export const getFakeOperador = () => {
	const faker = require('faker/locale/es');
	return new ActividadSesion({
		actividad: faker.name.firstName(),
		id: faker.random.number(),
		fecha: faker.random.number()
	});
};

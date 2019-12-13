const faker = require('faker/locale/es');

export interface IObraSocial {
	nombre: string;
	id: number;
}

export class ObraSocial implements IObraSocial {
	nombre: string;
	id: number;
	constructor(fuente: IObraSocial) {
		this.nombre = fuente.nombre;
		this.id = fuente.id;
	}
}

export const getFakeObraSocial = () => {
	return new ObraSocial({
		nombre: faker.name.firstName(),
		id: faker.random.number(),
	});
};


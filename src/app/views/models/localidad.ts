const faker = require('faker/locale/es');

export interface ILocalidad {
	nombre: string;
	id: number;
}

export class Localidad implements ILocalidad {
	nombre: string;
	id: number;
	constructor(fuente: ILocalidad) {
		this.nombre = fuente.nombre;
		this.id = fuente.id;
	}
}

export const getFakeLocalidad = () => {
	return new Localidad({
		nombre: faker.name.firstName(),
		id: faker.random.number(),
	});
};


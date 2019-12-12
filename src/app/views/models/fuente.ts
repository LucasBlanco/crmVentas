const faker = require('faker/locale/es');

export interface IFuente {
    nombre: string;
    id: number;
    proveedor: string;
}

export class Fuente implements IFuente {
    nombre: string;
    id: number;
	proveedor: string;
    constructor(fuente: IFuente) {
        this.nombre = fuente.nombre;
        this.id = fuente.id;
        this.proveedor = fuente.proveedor
    }
}

export const getFakeFuente = () => {
    return new Fuente({
        nombre: faker.name.firstName(),
        id: faker.random.number(),
		proveedor: faker.name.firstName()
    });
};


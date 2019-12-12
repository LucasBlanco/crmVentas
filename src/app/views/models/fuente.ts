const faker = require('faker/locale/es');

export interface IFuente {
    nombre: string;
    id: number;
}

export class Fuente implements IFuente {
    nombre: string;
    id: number;

    constructor(fuente: IFuente) {
        this.nombre = fuente.nombre;
        this.id = fuente.id;
    }
}

export const getFakeFuente = () => {
    return new Fuente({
        nombre: faker.name.firstName(),
        id: faker.random.number()
    });
};


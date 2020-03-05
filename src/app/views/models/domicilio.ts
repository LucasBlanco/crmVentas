export interface IDomicilio {
    calle: string;
    codigoPostal: number;
    codigoPostalNuevo?: number;
    departamento: string;
    id?: number;
    numero: number;
    piso: string;
    idLocalidad: number;
}

export class Domicilio implements IDomicilio {
    calle: string;
    codigoPostal: number;
    codigoPostalNuevo?: number;
    departamento: string;
    id?: number;
    numero: number;
    piso: string;
    idLocalidad: number;
    constructor(fuente: IDomicilio) {
        this.calle = fuente.calle;
        this.codigoPostal = fuente.codigoPostal;
        this.codigoPostalNuevo = fuente.codigoPostalNuevo;
        this.departamento = fuente.departamento;
        this.id = fuente.id;
        this.numero = fuente.numero;
        this.piso = fuente.piso;
        this.idLocalidad = fuente.idLocalidad;
    }
}

export const getFakeDomicilio = () => {
    const faker = require('faker/locale/es');
    return new Domicilio({
        calle: faker.address.streetName(),
        codigoPostal: faker.address.zipCode(),
        codigoPostalNuevo: faker.address.zipCode(),
        departamento: 'A',
        id: faker.random.number(),
        numero: faker.random.number(10),
        piso: faker.random.number(10),
        idLocalidad: 1
    });
};

import { ActividadSesion } from '@modelos/actividadSesion';


export interface IOperador {
    nombre: string;
    id: number;
    actividadReciente: ActividadSesion[];
}

export class Operador implements IOperador {
    nombre: string;
    id: number;
    actividadReciente: ActividadSesion[];
    constructor(contacto: IOperador) {
        this.nombre = contacto.nombre;
        this.id = contacto.id;
        this.actividadReciente = contacto.actividadReciente;
    }

    get ultimaActividad() { return this.actividadReciente[0] }
}

export const getFakeOperador = () => {
    const faker = require('faker/locale/es');
    return new Operador({
        nombre: faker.name.firstName(),
        id: faker.random.number(),
        actividadReciente: []
    });
};

export interface IOperador {
    nombre: string;
    id: number;
}

export class Operador implements IOperador {
    nombre: string;
    id: number;
    constructor(contacto: IOperador) {
        this.nombre = contacto.nombre;
        this.id = contacto.id;
    }
}

export const getFakeOperador = () => new Operador({
    nombre: 'Carlos',
    id: 1
});

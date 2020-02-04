export interface ITelefono {
    id: number;
    numero: string;
    horarioContacto: {
        desde: string,
        hasta: string;
    };
}

export class Telefono implements ITelefono {
    id: number;
    numero: string;
    horarioContacto: {
        desde: string,
        hasta: string;
    };

    constructor(telefono: ITelefono) {
        this.id = telefono.id;
        this.numero = telefono.numero;
        this.horarioContacto = telefono.horarioContacto;
    }
}

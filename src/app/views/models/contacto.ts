export interface IContacto {
    nombre: string;
    domicilio: string;
    cuil: string;
    telefono: string;
    id: number;
}

export interface IContactoConHorario extends IContacto {
    horario: {
        desde: any,
        hasta: any
    }
}

export class Contacto implements IContacto {
    nombre: string;
    domicilio: string;
    cuil: string;
    telefono: string;
    id: number;
    constructor(contacto: IContacto) {
        this.nombre = contacto.nombre;
        this.domicilio = contacto.domicilio;
        this.cuil = contacto.cuil;
        this.telefono = contacto.telefono;
        this.id = contacto.id;
    }
}

export class ContactoConHorario extends Contacto implements IContactoConHorario {

    horario: { desde: any, hasta: any }
    constructor(contacto: IContactoConHorario) {
        super(contacto)
        this.horario = contacto.horario;
    }
}

export const getFakeContacto = () => new Contacto({
    nombre: 'Carlos',
    cuil: '20-39268594-5',
    domicilio: 'Dr Luis Belaustegui 4043',
    telefono: '+54-11-45681513',
    id: 1
});

export const getFakeContactoConHorario = () => new ContactoConHorario({
    nombre: 'Carlos',
    cuil: '20-39268594-5',
    domicilio: 'Dr Luis Belaustegui 4043',
    telefono: '+54-11-45681513',
    id: 1,
    horario: { desde: '2019-10-23T12:24:00', hasta: '2019-10-23T11:30:00' }
});

import { Persona } from '@modelos/persona';
import moment from 'moment';

import { getFakePersona } from './persona';
import { Telefono } from './telefono';


export interface IContacto {
    id: number;
    persona: Persona;
    telefonos: Telefono[];
    idBase: number;
}

export interface IContactoConHorario extends IContacto {
    horario: string;
    nota: string;
}

export class Contacto implements IContacto {
    persona: Persona;
    id: number;
    telefonos: Telefono[];
    idBase: number;
    constructor(contacto: IContacto) {
        this.id = contacto.id;
        this.persona = contacto.persona;
        this.telefonos = contacto.telefonos;
        this.idBase = contacto.idBase;
    }
}

export class ContactoConHorario extends Contacto implements IContactoConHorario {
    horario: string;
    nota: string;
    constructor(contacto: IContactoConHorario) {
        super(contacto);
        this.horario = contacto.horario;
        this.nota = contacto.nota;
    }

    get habilitado() {
        const hora = moment(this.horario, 'YYYY-MM-DD hh-mm-ss');
        const ahora = moment();
        const laHoraYaPaso = hora.isBefore(ahora);
        return laHoraYaPaso;
    }
}

export const getFakeContacto = () => new Contacto({
    id: 1,
    persona: getFakePersona(),
    telefonos: [],
    idBase: 1
});

export const getFakeContactoConHorario = () => new ContactoConHorario({
    persona: getFakePersona(),
    id: 1,
    horario: '2000-05-05T12:24:00',
    nota: 'holaaa',
    telefonos: [],
    idBase: 1
});

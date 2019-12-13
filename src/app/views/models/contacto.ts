import { Persona } from '@modelos/persona';
import moment from 'moment';

import { getFakePersona } from './persona';


export interface IContacto {
    id: number;
    persona: Persona;
}

export interface IContactoConHorario extends IContacto {
    horario: string;
}

export class Contacto implements IContacto {
    persona: Persona;
    id: number;
    constructor(contacto: IContacto) {
        this.id = contacto.id;
        this.persona = contacto.persona;
    }
}

export class ContactoConHorario extends Contacto implements IContactoConHorario {

    horario: string;
    constructor(contacto: IContactoConHorario) {
        super(contacto);
        this.horario = contacto.horario;
    }

    get habilitado() {
        const hora = moment(this.horario, 'YYYY-MM-DD hh-mm-ss')
        const ahora = moment()
        const laHoraYaPaso = hora.isBefore(ahora)
        return laHoraYaPaso
    }
}

export const getFakeContacto = () => new Contacto({
    id: 1,
    persona: getFakePersona()
});

export const getFakeContactoConHorario = () => new ContactoConHorario({
    persona: getFakePersona(),
    id: 1,
    horario: '2000-05-05T12:24:00'
});

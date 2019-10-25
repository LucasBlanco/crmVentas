import { Injectable } from '@angular/core';
import { Contacto, ContactoConHorario, getFakeContacto, getFakeContactoConHorario } from '@modelos/contacto';
import { BehaviorSubject } from 'rxjs';

export enum Columnas {
  ALLAMAR = 'ALLMAR',
  RELLAMAR = 'RELLAMAR',
  AGENDADO = 'AGENDADO'
}

@Injectable({
  providedIn: 'root'
})
export class CrmService {

  contactosALlamar$: BehaviorSubject<Contacto[]> = new BehaviorSubject([]);
  contactosAgendados$: BehaviorSubject<ContactoConHorario[]> = new BehaviorSubject([]);
  contactosARellamar$: BehaviorSubject<ContactoConHorario[]> = new BehaviorSubject([]);

  constructor() {
    const contacto1 = getFakeContacto();
    const contacto2 = {
      ...getFakeContactoConHorario(),
      nombre: 'Carlos2',
      id: 2
    };
    const contacto3 = {
      ...getFakeContactoConHorario(),
      nombre: 'Carlos3',
      id: 3
    };
    this.contactosALlamar$ = new BehaviorSubject([new Contacto(contacto1)]);
    this.contactosAgendados$ = new BehaviorSubject([new ContactoConHorario(contacto2)]);
    this.contactosARellamar$ = new BehaviorSubject([new ContactoConHorario(contacto3)]);
  }


  getContactosALlamar = () => {
    return this.contactosALlamar$;
  }

  getContactosAgendados = () => {
    return this.contactosAgendados$;
  }

  getContactosARellamar = () => {
    return this.contactosARellamar$;
  }

  getObservable = (columnName: Columnas) => {
    switch (columnName) {
      case Columnas.ALLAMAR:
        return this.contactosALlamar$;
      case Columnas.RELLAMAR:
        return this.contactosARellamar$;
      case Columnas.AGENDADO:
        return this.contactosAgendados$;
    }
  }

  moverContacto(from: Columnas, to: Columnas, contacto: Contacto) {
    const fromObservable = this.getObservable(from);
    const toObservable = this.getObservable(to);
    const fromValues = fromObservable.value;
    const toValues = toObservable.value;
    if (from === to) {
      toObservable.next([...toValues.filter(c => c.id !== contacto.id), contacto]);
    } else {
      fromObservable.next(fromValues.filter(c => c.id !== contacto.id));
      toObservable.next([...toValues, contacto]);
    }
  }
}

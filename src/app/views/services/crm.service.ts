import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto, ContactoConHorario } from '@modelos/contacto';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { PersonaService } from './persona.service';
import { UserService } from './user.service';

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

  constructor(private http: HttpClient, private userSrv: UserService, private personaSrv: PersonaService) {
    /*const contacto1 = getFakeContacto();
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
    this.contactosARellamar$ = new BehaviorSubject([new ContactoConHorario(contacto3)]);*/
  }


  getContactosALlamar = (): Observable<Contacto[]> => {
    this.http.get<Contacto[]>(`${environment.ip}/crm/asignados/${this.userSrv.getCurrentUser().id}`)
      .pipe(map(contactos => contactos.map(this.mapContactoToFront)))
      .subscribe(contactos => this.contactosALlamar$.next(contactos));
    return this.contactosALlamar$;
  }

  getContactosAgendados = (): Observable<ContactoConHorario[]> => {
    this.http.get<Contacto[]>(`${environment.ip}/crm/agendados/${this.userSrv.getCurrentUser().id}`)
      .pipe(map(contactos => contactos.map(this.mapContactoConHorarioToFront)))
      .subscribe(contactos => this.contactosAgendados$.next(contactos));
    return this.contactosAgendados$;
  }

  getContactosARellamar = (): Observable<ContactoConHorario[]> => {
    this.http.get<Contacto[]>(`${environment.ip}/crm/rellamados/${this.userSrv.getCurrentUser().id}`)
      .pipe(map(contactos => contactos.map(this.mapContactoConHorarioToFront)))
      .subscribe(contactos => this.contactosARellamar$.next(contactos));
    return this.contactosARellamar$;
  }

  mapContactoToFront = (contacto) => {
    return new Contacto({
      id: contacto.id,
      persona: this.personaSrv.mapToFront(contacto.persona)
    });
  }

  mapContactoConHorarioToFront = (contacto) => {
    return new ContactoConHorario({
      id: contacto.id,
      persona: this.personaSrv.mapToFront(contacto.persona),
      horario: contacto.agendados[0].fecha
    });
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

  moverContacto(from: Columnas, to: Columnas, id: number) {
    const fromObservable = this.getObservable(from);
    const toObservable = this.getObservable(to);
    const fromValues = fromObservable.value;
    const toValues = toObservable.value;
    const contacto = fromValues.find(c => c.id === id);
    if (from === to) {
      toObservable.next([...toValues.filter(c => c.id !== contacto.id), contacto]);
    } else {
      fromObservable.next(fromValues.filter(c => c.id !== contacto.id));
      toObservable.next([...toValues, contacto]);
    }
  }

  borrarContacto(from: Columnas, id: number) {
    const fromObservable = this.getObservable(from);
    const fromValues = fromObservable.value;
    fromObservable.next(fromValues.filter(c => c.id !== id));
  }

  rechazar(from: Columnas, { id, observacion }) {
    this.http.post(`${environment.ip}/crm/rechazar`, { id_venta: id, observacion })
      .subscribe(() => this.borrarContacto(from, id));
  }

  agendar(from: Columnas, { fechaYHoraDeProximoContacto, nota, id }) {
    this.http.post(`${environment.ip}/crm/agendarLlamado`,
      { id_venta: id, fecha: fechaYHoraDeProximoContacto, nota, rellamado: false })
      .subscribe(() => this.getContactosAgendados());
  }

  hayContactosAgendados(): Observable<boolean> {
    /*return this.contactosAgendados$.pipe(
      map(contactos => contactos.filter(c => c.habilitado).length > 0)
    );*/
    return of(false)
  }
}

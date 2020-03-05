import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto, ContactoConHorario } from '@modelos/contacto';
import { Telefono } from '@modelos/telefono';
import { Venta } from '@modelos/venta';
import fp from 'lodash/fp';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { PersonaMapperService } from './persona-mapper.service';
import { UserService } from './user.service';

export enum Columnas {
  ALLAMAR = 'ALLAMAR',
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

  constructor(private http: HttpClient, private userSrv: UserService, private personaMap: PersonaMapperService) {
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

  cambiarTelefonos = (funcionCambio) => (contacto: Contacto) => {
    const columnaNombre = this.columnaDondeEstaElContacto(contacto);
    const columna$ = this.getObservable(columnaNombre);
    const columna = columna$.value.map(cont => {
      if (cont.id !== contacto.id) { return cont; }
      contacto.telefonos = funcionCambio(contacto.telefonos);
      return contacto;
    });
    columna$.next(columna);
  };

  borrarTelefonoContacto(contacto: Contacto, telefono: Telefono) {
    const borrar = this.cambiarTelefonos(fp.filter<Telefono>(tel => {
      return tel.id !== telefono.id;
    }));
    borrar(contacto);
  }

  altaTelefonoContacto(contacto: Contacto, telefono: Telefono) {
    const alta = this.cambiarTelefonos(fp.concat(telefono));
    alta(contacto);
  }

  modificarTelefonoContacto(contacto: Contacto, telefono: Telefono) {
    const modificacion = this.cambiarTelefonos(fp.map<Telefono, Telefono>(tel => {
      return tel.id === telefono.id ? telefono : tel;
    }));
    modificacion(contacto);
  }

  columnaDondeEstaElContacto(contacto: Contacto) {
    const columnas = [
      { columna: Columnas.ALLAMAR, contactos: this.contactosALlamar$.value },
      { columna: Columnas.RELLAMAR, contactos: this.contactosARellamar$.value },
      { columna: Columnas.AGENDADO, contactos: this.contactosAgendados$.value }
    ];
    return columnas.find(col => col.contactos.some(c => c.id === contacto.id)).columna;
  }

  getContactosALlamar = (): Observable<Contacto[]> => {
    this.http.get<Contacto[]>(`${environment.ip}/crm/asignados/${this.userSrv.getCurrentUser().id}?XDEBUG_SESSION_START=PHPSTORM`)
      .pipe(map(contactos => contactos.map(this.mapContactoToFront)))
      .subscribe(contactos => this.contactosALlamar$.next(contactos));
    return this.contactosALlamar$;
  };

  getContactosAgendados = (): Observable<ContactoConHorario[]> => {
    this.http.get<Contacto[]>(`${environment.ip}/crm/agendados/${this.userSrv.getCurrentUser().id}`)
      .pipe(map(contactos => contactos.map(this.mapContactoConHorarioToFront)))
      .subscribe(contactos => this.contactosAgendados$.next(contactos));
    return this.contactosAgendados$;
  };

  getContactosARellamar = (): Observable<ContactoConHorario[]> => {
    this.http.get<Contacto[]>(`${environment.ip}/crm/rellamados/${this.userSrv.getCurrentUser().id}`)
      .pipe(map(contactos => contactos.map(this.mapContactoConHorarioToFront)))
      .subscribe(contactos => this.contactosARellamar$.next(contactos));
    return this.contactosARellamar$;
  };

  mapContactoToFront = (contacto) => {
    return new Contacto({
      id: contacto.id,
      persona: this.personaMap.mapToFront(contacto),
      telefonos: contacto.telefonos.map(this.personaMap.mapTelefonoToFront),
      idBase: contacto.idBase
    });
  };

  mapContactoConHorarioToFront = (contacto) => {
    return new ContactoConHorario({
      id: contacto.id,
      persona: this.personaMap.mapToFront(contacto),
      telefonos: contacto.telefonos.map(this.personaMap.mapTelefonoToFront),
      horario: contacto.agendados[contacto.agendados.length - 1].fecha,
      nota: contacto.agendados[contacto.agendados.length - 1].nota,
      idBase: contacto.idBase
    });
  };

  getObservable = (columnName: Columnas) => {
    switch (columnName) {
      case Columnas.ALLAMAR:
        return this.contactosALlamar$;
      case Columnas.RELLAMAR:
        return this.contactosARellamar$;
      case Columnas.AGENDADO:
        return this.contactosAgendados$;
    }
  };

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
      .subscribe(() => { this.borrarContacto(from, id); this.getContactosAgendados(); });
  }

  rellamar(from: Columnas, { fechaYHoraDeProximoContacto, nota, id }) {
    this.http.post(`${environment.ip}/crm/agendarLlamado`,
      { id_venta: id, fecha: fechaYHoraDeProximoContacto, nota, rellamado: true })
      .subscribe(() => { this.borrarContacto(from, id); this.getContactosARellamar(); });
  }

  vender(from: Columnas, venta: Venta) {
    this.http.post(`${environment.ip}/crm/vender`,
      {
        id_venta: venta.id,
        nombre: venta.nombre,
        apellido: venta.apellido,
        nacionalidad: venta.nacionalidad,
        cuil: venta.cuil,
        sexo: venta.sexo,
        estado_civil: venta.estadoCivil,
        id_obra_social: venta.idObraSocial,
        fecha_nacimiento: venta.fechaNacimiento,
        capitas: venta.capitas,
        domicilio: {
          codigo_postal: venta.domicilio.codigoPostal,
          numero: venta.domicilio.numero,
          id_localidad: venta.domicilio.idLocalidad,
          calle: venta.domicilio.calle,
          piso: venta.domicilio.piso,
          departamento: venta.domicilio.departamento
        }
      }).subscribe(() => {
        this.borrarContacto(from, venta.id);
      });
  }

  hayContactosAgendados(): Observable<boolean> {
    return this.contactosAgendados$.pipe(
      map(contactos => contactos.filter(c => c.habilitado).length > 0)
    );
  }
}

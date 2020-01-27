import { Injectable } from '@angular/core';
import { Persona } from '@modelos/persona';
import * as moment from 'moment';
import { of } from 'rxjs';

import { Domicilio } from './../models/domicilio';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor() { }

  borrarTelefono(id) {
    return of(true);
  }
  editarTelefono(id, telefono) {
    return of(true);
  }

  mapToFront({ persona, telefonos }) {
    return new Persona({
      nombre: persona.nombre,
      apellido: persona.apellido,
      cuil: persona.cuil,
      dni: persona.dni,
      nacionalidad: persona.nacionalidad,
      estadoCivil: persona.estadoCivil,
      fechaNacimiento: moment(persona.fechaNacimiento).format('YYYY-MM-DD'),
      capitas: persona.capitas,
      id: persona.id,
      sexo: persona.sexo,
      domicilio: persona.domicilios[0] && this.mapDomicilioToFront(persona.domicilios[0]),
      telefonos: telefonos.map(telefono => ({
        numero: telefono.numero,
        horarioContacto: { desde: telefono.horarioContactoDesde, hasta: telefono.horarioContactoHasta },
        id: telefono.id
      }))
    });
  }

  mapDomicilioToFront(domicilio) {
    return new Domicilio({
      calle: domicilio.calle,
      codigoPostal: domicilio.codigoPostal,
      codigoPostalNuevo: domicilio.codigoPostalNuevo,
      departamento: domicilio.departamento,
      id: domicilio.id,
      numero: domicilio.numero,
      piso: domicilio.piso,
      idLocalidad: domicilio.idLocalidad
    });
  }
}

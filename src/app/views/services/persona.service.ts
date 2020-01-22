import { Injectable } from '@angular/core';
import { Persona } from '@modelos/persona';
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

  mapToFront(persona) {
    return new Persona({
      nombre: persona.nombre,
      apellido: persona.apellido,
      cuil: persona.cuil,
      dni: persona.dni,
      nacionalidad: persona.nacionalidad,
      estadoCivil: persona.estadoCivil,
      fechaNacimiento: persona.fechaNacimiento,
      capitas: persona.capitas,
      id: persona.id,
      sexo: persona.sexo,
      domicilio: persona.domicilios[0] && this.mapDomicilioToFront(persona.domicilios[0]),
      telefonos: [
        { nombre: 'celular', numero: persona.celular, horarioContacto: persona.horaContactoCel },
        { nombre: 'telefono', numero: persona.telefono, horarioContacto: persona.horaContactoTel }
      ]
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

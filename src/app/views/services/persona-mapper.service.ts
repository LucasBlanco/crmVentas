import { Injectable } from '@angular/core';
import { Domicilio } from '@modelos/domicilio';
import { Persona } from '@modelos/persona';
import { Telefono } from '@modelos/telefono';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PersonaMapperService {

  constructor() { }

  mapToBack(telefono: Telefono) {
    return {
      numero: telefono.numero,
      horario_contacto_desde: telefono.horarioContacto.desde,
      horario_contacto_hasta: telefono.horarioContacto.hasta
    };
  }
  mapToFront({ telefonos, persona }) {
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

  mapTelefonoToFront(telefono) {
    return new Telefono({
      numero: telefono.numero,
      id: telefono.id,
      horarioContacto: {
        desde: telefono.horarioContactoDesde,
        hasta: telefono.horarioContactoHasta
      }
    });
  }

  mapTelefonoToBack(telefono: Telefono) {
    return {
      numero: telefono.numero,
      id: telefono.id,
      horario_contacto_desde: telefono.horarioContacto.desde,
      horario_contacto_hasta: telefono.horarioContacto.hasta
    };
  }
}

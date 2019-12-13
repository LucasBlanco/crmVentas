import { Injectable } from '@angular/core';
import { Persona } from '@modelos/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor() { }

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
      telefonos: [
        { nombre: 'celular', numero: persona.celular, horarioContacto: persona.horaContactoCel },
        { nombre: 'telefono', numero: persona.telefono, horarioContacto: persona.horaContactoTel }
      ]
    });
  }
}

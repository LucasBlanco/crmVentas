import { Injectable } from '@angular/core';
import { Telefono } from '@modelos/telefono';

@Injectable({
  providedIn: 'root'
})
export class TelefonoMapperService {
  /* Creado para evitar una dependencia circular entre CrmService y TelefonoService */
  constructor() { }

  mapToBack(telefono: Telefono) {
    return {
      numero: telefono.numero,
      horario_contacto_desde: telefono.horarioContacto.desde,
      horario_contacto_hasta: telefono.horarioContacto.hasta
    };
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

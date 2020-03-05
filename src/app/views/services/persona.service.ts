import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Persona } from '@modelos/persona';
import { CrmService } from '@servicios/crm.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PersonaMapperService } from './persona-mapper.service';
import { TelefonoMapperService } from './telefono-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(
    private http: HttpClient,
    private crmService: CrmService,
    private mapper: PersonaMapperService,
    private telefonoMap: TelefonoMapperService
  ) { }

  crear(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${environment.ip}/personas`, this.mapToBack(persona));
  }

  crearYObtenerIdVenta(persona: Persona): Observable<number> {
    return this.http.post<Persona & { venta: any; }>(`${environment.ip}/personas`, this.mapToBack(persona)).pipe(
      map(({ venta }) => venta.id)
    );
  }

  mapToBack(persona: Persona) {
    const personaBack = {
      dni: persona.dni,
      nombre: persona.nombre,
      apellido: persona.apellido,
      nacionalidad: persona.nacionalidad,
      telefonos: persona.telefonos.map(this.telefonoMap.mapTelefonoToBack),
      cuil: persona.cuil,
      estado_civil: persona.estadoCivil,
      fecha_nacimiento: persona.fechaNacimiento,
      capitas: persona.capitas,
    };
    if (persona.domicilio.calle && persona.domicilio.numero) {
      return { ...personaBack, domicilio: this.mapper.mapDomicilioToBack(persona.domicilio) };
    }
    return personaBack;
  }

}


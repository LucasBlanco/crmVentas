import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto } from '@modelos/contacto';
import { CrmService } from '@servicios/crm.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Telefono } from './../models/telefono';
import { PersonaMapperService } from './persona-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient, private crmService: CrmService, private mapper: PersonaMapperService) { }

  borrarTelefono(telefono: Telefono, contacto: Contacto) {
    let params = new HttpParams()
      .append('id_persona', contacto.persona.id.toString())
      .append('id_base', contacto.idBase.toString())
      .append('id_telefono', telefono.id.toString());
    return this.http.delete(`${environment.ip}/contactos`, { params }).pipe(
      tap(() => this.crmService.borrarTelefonoContacto(contacto, telefono))
    );
  }

  editarTelefono(telefono: Telefono, contacto: Contacto): Observable<Telefono> {
    const telBack = this.mapper.mapTelefonoToBack(telefono);
    return this.http.put<Telefono>(`${environment.ip}/telefonos/${telefono.id}`, telBack).pipe(
      map(tel => this.mapper.mapTelefonoToFront(tel)),
      tap(tel => this.crmService.modificarTelefonoContacto(contacto, tel))
    );
  }

  crearTelefono(telefono: Telefono, contacto: Contacto): Observable<Telefono> {
    const telBack = {
      ...this.mapper.mapTelefonoToBack(telefono),
      id_base: contacto.idBase,
      id_persona: contacto.persona.id
    };
    return this.http.post<Telefono>(`${environment.ip}/telefonos`, telBack).pipe(
      map(tel => this.mapper.mapTelefonoToFront(tel)),
      tap(tel => this.crmService.altaTelefonoContacto(contacto, tel))
    );
  }

}


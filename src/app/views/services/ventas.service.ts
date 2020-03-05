import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Venta } from './../models/venta';
import { PersonaMapperService } from './persona-mapper.service';
import { UserService } from './user.service';

const appendParamIfNotNull = (param: HttpParams, valueToAppend: { param: string, value: string; }) => {
  if (valueToAppend.value) {
    return param.append(valueToAppend.param, valueToAppend.value);
  }
  return param;
};

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient, private personaMapper: PersonaMapperService) { }

  pendientesDe = (estados: ('crearVisita')[], usuario?): Observable<Venta[]> => {
    let params = new HttpParams();
    estados.forEach(e => params = params.append('pendientesDe[]', e));
    params = appendParamIfNotNull(params, { param: 'user', value: usuario });
    return this.http.get<Venta[]>(`${environment.ip}/ventas`, { params }).pipe(
      map(ventas => ventas.map(this.mapToFront.bind(this)))
    );
  };

  mapToFront(ventaBack): Venta {
    // Creo una persona con los telefonos de la venta, por ahora es suficiente pero en algun momento puede requerir un cambio mayor
    const persona = this.personaMapper.mapToFront({ persona: ventaBack.persona, telefonos: ventaBack.telefonos });
    return {
      ...persona,
      id: ventaBack.id,
      idObraSocial: ventaBack.obraSocial,
    };
  }

}

@Injectable({
  providedIn: 'root'
})
export class MisVentasService {

  constructor(private ventaService: VentasService, private usuarioService: UserService) { }

  ventasSinVisita() {
    return this.ventaService.pendientesDe(
      ['crearVisita'],
      this.usuarioService.getCurrentUser().id
    );
  }

}



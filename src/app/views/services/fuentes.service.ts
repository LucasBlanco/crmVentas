import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fuente } from '@modelos/fuente';
import { Persona } from '@modelos/persona';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuentesService {

  personas$ = new BehaviorSubject<Persona[]>([]);
  constructor(private http: HttpClient) {
    /*for (let i = 0; i <= 100; i++) {
      this.fuentes.push(getFakeFuente());
    }
    for (let i = 0; i <= 100; i++) {
      this.personas.push(getFakePersona());
    }*/
  }

  traerTodos(tipo?) {
    const request = tipo ?
      this.http.get<Fuente[]>(environment.ip + '/bases', { params: { tipo } })
      : this.http.get<Fuente[]>(environment.ip + '/bases');
    return request.pipe(
      map(fuentes => fuentes.map(this.mapToFront))
    );
    // return new BehaviorSubject(this.fuentes);
  }

  traerUno(id: number) {
    this.http.get<Persona[]>(`${environment.ip}/bases/${id}/personas`).subscribe(
      personas => this.personas$.next(personas)
    );
    return this.personas$;
  }

  mapToFront(fuente) {
    return new Fuente({ nombre: fuente.nombre, id: fuente.id, proveedor: fuente.proveedor });
  }
}

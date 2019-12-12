import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fuente } from '@modelos/fuente';
import { Persona } from '@modelos/persona';
import { BehaviorSubject } from 'rxjs';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuentesService {

  fuentes$ = new BehaviorSubject<Fuente[]>([]);
  personas$ = new BehaviorSubject<Persona[]>([]);
  constructor(private http: HttpClient) {
    /*for (let i = 0; i <= 100; i++) {
      this.fuentes.push(getFakeFuente());
    }
    for (let i = 0; i <= 100; i++) {
      this.personas.push(getFakePersona());
    }*/
  }

  traerTodos() {
    this.http.get<Fuente[]>(`${environment.ip}/bases`).subscribe(
      bases => this.fuentes$.next(bases)
    );
    return this.fuentes$;
    // return new BehaviorSubject(this.fuentes);
  }

  traerUno(id: number) {
    this.http.get<Persona[]>(`${environment.ip}/bases/${id}/personas`).subscribe(
      personas => this.personas$.next(personas)
    );
    return this.personas$;
  }
}

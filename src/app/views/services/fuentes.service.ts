import { Injectable } from '@angular/core';
import { Fuente } from '@modelos/fuente';
import { of } from 'rxjs';

import { getFakeFuente } from './../models/fuente';
import { getFakePersona } from './../models/persona';

@Injectable({
  providedIn: 'root'
})
export class FuentesService {

  fuentes: Fuente[];
  constructor() {
    const fuente1 = getFakeFuente();
    const fuente2 = { ...getFakeFuente(), nombre: 'otraFuente', id: 2 };
    this.fuentes = [fuente1, fuente2];
  }

  traerTodos() {
    return of(this.fuentes);
  }

  traerUno(id: number) {
    return of([getFakePersona(), { ...getFakePersona(), id: 2 }]);
  }
}
